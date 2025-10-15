"""
Authentication module for MoodMate AI
Handles user registration, login, password reset, and session management
"""

import os
import jwt
import hashlib
import secrets
from datetime import datetime, timedelta
from flask import request, jsonify, current_app
from functools import wraps
from supabase import create_client, Client
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"), 
    os.getenv("SUPABASE_KEY")
)

# JWT Configuration
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Email Configuration
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@moodmate.ai")

class AuthError(Exception):
    """Custom exception for authentication errors"""
    pass

def hash_password(password: str) -> str:
    """Hash password using SHA-256 with salt"""
    salt = secrets.token_hex(16)
    password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}:{password_hash}"

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    try:
        salt, password_hash = hashed_password.split(":")
        return hashlib.sha256((password + salt).encode()).hexdigest() == password_hash
    except ValueError:
        return False

def generate_jwt_token(user_id: str, user_type: str = "patient") -> str:
    """Generate JWT token for user"""
    payload = {
        "user_id": user_id,
        "user_type": user_type,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> dict:
    """Verify JWT token and return payload"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise AuthError("Token has expired")
    except jwt.InvalidTokenError:
        raise AuthError("Invalid token")

def get_current_user():
    """Get current user from JWT token in request headers"""
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise AuthError("No authorization header")
    
    try:
        token = auth_header.split(" ")[1]  # Bearer <token>
        payload = verify_jwt_token(token)
        return payload
    except IndexError:
        raise AuthError("Invalid authorization header format")
    except AuthError:
        raise

def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            user = get_current_user()
            return f(user, *args, **kwargs)
        except AuthError as e:
            return jsonify({"error": str(e)}), 401
    return decorated_function

def require_admin(f):
    """Decorator to require admin authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            user = get_current_user()
            if user.get("user_type") != "admin":
                return jsonify({"error": "Admin access required"}), 403
            return f(user, *args, **kwargs)
        except AuthError as e:
            return jsonify({"error": str(e)}), 401
    return decorated_function

def send_email(to_email: str, subject: str, body: str) -> bool:
    """Send email using SMTP"""
    try:
        msg = MIMEMultipart()
        msg['From'] = FROM_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(FROM_EMAIL, to_email, text)
        server.quit()
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False

def register_user(email: str, password: str, name: str, user_type: str = "patient") -> dict:
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = supabase.table("users").select("id").eq("email", email).execute()
        if existing_user.data:
            raise AuthError("User with this email already exists")
        
        # Hash password
        hashed_password = hash_password(password)
        
        # Create user
        user_data = {
            "email": email,
            "name": name,
            "password_hash": hashed_password,
            "user_type": user_type,
            "created_at": datetime.now().isoformat(),
            "is_active": True,
            "email_verified": False
        }
        
        result = supabase.table("users").insert(user_data).execute()
        user = result.data[0]
        
        # Create default user settings
        settings_data = {
            "user_id": user["id"],
            "created_at": datetime.now().isoformat()
        }
        supabase.table("user_settings").insert(settings_data).execute()
        
        # Generate verification token
        verification_token = secrets.token_urlsafe(32)
        verification_data = {
            "user_id": user["id"],
            "token": verification_token,
            "type": "email_verification",
            "expires_at": (datetime.now() + timedelta(hours=24)).isoformat(),
            "created_at": datetime.now().isoformat()
        }
        supabase.table("verification_tokens").insert(verification_data).execute()
        
        # Send verification email
        verification_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/verify-email?token={verification_token}"
        email_body = f"""
        <html>
        <body>
            <h2>Welcome to MoodMate AI!</h2>
            <p>Hi {name},</p>
            <p>Thank you for registering with MoodMate AI. Please verify your email address by clicking the link below:</p>
            <p><a href="{verification_url}">Verify Email Address</a></p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create this account, please ignore this email.</p>
            <p>Best regards,<br>The MoodMate AI Team</p>
        </body>
        </html>
        """
        
        send_email(email, "Verify Your Email - MoodMate AI", email_body)
        
        return {
            "user": {
                "id": user["id"],
                "email": user["email"],
                "name": user["name"],
                "user_type": user["user_type"],
                "email_verified": user["email_verified"]
            },
            "message": "Registration successful. Please check your email to verify your account."
        }
        
    except Exception as e:
        raise AuthError(f"Registration failed: {str(e)}")

def login_user(email: str, password: str) -> dict:
    """Login user with email and password"""
    try:
        # Get user by email
        result = supabase.table("users").select("*").eq("email", email).execute()
        if not result.data:
            raise AuthError("Invalid email or password")
        
        user = result.data[0]
        
        # Check if user is active
        if not user.get("is_active", True):
            raise AuthError("Account is deactivated")
        
        # Verify password
        if not verify_password(password, user.get("password_hash", "")):
            raise AuthError("Invalid email or password")
        
        # Update last login
        supabase.table("users").update({
            "last_login": datetime.now().isoformat()
        }).eq("id", user["id"]).execute()
        
        # Generate JWT token
        token = generate_jwt_token(user["id"], user["user_type"])
        
        return {
            "user": {
                "id": user["id"],
                "email": user["email"],
                "name": user["name"],
                "user_type": user["user_type"],
                "email_verified": user.get("email_verified", False)
            },
            "token": token,
            "expires_in": JWT_EXPIRATION_HOURS * 3600
        }
        
    except AuthError:
        raise
    except Exception as e:
        raise AuthError(f"Login failed: {str(e)}")

def verify_email_token(token: str) -> bool:
    """Verify email verification token"""
    try:
        result = supabase.table("verification_tokens").select("*").eq("token", token).eq("type", "email_verification").execute()
        if not result.data:
            return False
        
        verification = result.data[0]
        
        # Check if token is expired
        if datetime.now() > datetime.fromisoformat(verification["expires_at"]):
            return False
        
        # Update user email_verified status
        supabase.table("users").update({
            "email_verified": True
        }).eq("id", verification["user_id"]).execute()
        
        # Delete used token
        supabase.table("verification_tokens").delete().eq("id", verification["id"]).execute()
        
        return True
        
    except Exception as e:
        print(f"Email verification failed: {e}")
        return False

def request_password_reset(email: str) -> bool:
    """Request password reset"""
    try:
        # Check if user exists
        result = supabase.table("users").select("id, name").eq("email", email).execute()
        if not result.data:
            return True  # Don't reveal if user exists
        
        user = result.data[0]
        
        # Generate reset token
        reset_token = secrets.token_urlsafe(32)
        reset_data = {
            "user_id": user["id"],
            "token": reset_token,
            "type": "password_reset",
            "expires_at": (datetime.now() + timedelta(hours=1)).isoformat(),
            "created_at": datetime.now().isoformat()
        }
        supabase.table("verification_tokens").insert(reset_data).execute()
        
        # Send reset email
        reset_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token={reset_token}"
        email_body = f"""
        <html>
        <body>
            <h2>Password Reset Request</h2>
            <p>Hi {user['name']},</p>
            <p>You requested a password reset for your MoodMate AI account. Click the link below to reset your password:</p>
            <p><a href="{reset_url}">Reset Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this reset, please ignore this email.</p>
            <p>Best regards,<br>The MoodMate AI Team</p>
        </body>
        </html>
        """
        
        return send_email(email, "Password Reset - MoodMate AI", email_body)
        
    except Exception as e:
        print(f"Password reset request failed: {e}")
        return False

def reset_password(token: str, new_password: str) -> bool:
    """Reset password using token"""
    try:
        # Get reset token
        result = supabase.table("verification_tokens").select("*").eq("token", token).eq("type", "password_reset").execute()
        if not result.data:
            return False
        
        reset_data = result.data[0]
        
        # Check if token is expired
        if datetime.now() > datetime.fromisoformat(reset_data["expires_at"]):
            return False
        
        # Hash new password
        hashed_password = hash_password(new_password)
        
        # Update user password
        supabase.table("users").update({
            "password_hash": hashed_password
        }).eq("id", reset_data["user_id"]).execute()
        
        # Delete used token
        supabase.table("verification_tokens").delete().eq("id", reset_data["id"]).execute()
        
        return True
        
    except Exception as e:
        print(f"Password reset failed: {e}")
        return False

def change_password(user_id: str, current_password: str, new_password: str) -> bool:
    """Change password for authenticated user"""
    try:
        # Get user
        result = supabase.table("users").select("password_hash").eq("id", user_id).execute()
        if not result.data:
            return False
        
        user = result.data[0]
        
        # Verify current password
        if not verify_password(current_password, user["password_hash"]):
            return False
        
        # Hash new password
        hashed_password = hash_password(new_password)
        
        # Update password
        supabase.table("users").update({
            "password_hash": hashed_password
        }).eq("id", user_id).execute()
        
        return True
        
    except Exception as e:
        print(f"Password change failed: {e}")
        return False

def logout_user(user_id: str) -> bool:
    """Logout user (invalidate token on client side)"""
    # In a more sophisticated implementation, you might maintain a blacklist of tokens
    # For now, we'll just return True as JWT tokens are stateless
    return True
