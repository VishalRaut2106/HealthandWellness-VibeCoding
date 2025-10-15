from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import json
from datetime import datetime, timedelta
import uuid
from auth import (
    register_user, login_user, verify_email_token, request_password_reset, 
    reset_password, change_password, logout_user, require_auth, require_admin
)

load_dotenv()
app = Flask(__name__)
CORS(app)

# Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"), 
    os.getenv("SUPABASE_KEY")
)

# Initialize sentiment analysis pipeline
print("Loading sentiment analysis model...")
analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
print("Model loaded successfully!")

@app.route("/analyze", methods=["POST"])
def analyze():
    """Analyze sentiment of text using Hugging Face transformers"""
    try:
        data = request.get_json()
        text = data.get("text", "")
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        # Analyze sentiment
        result = analyzer(text)[0]
        sentiment = result["label"].lower()
        score = round(result["score"], 2)
        
        return jsonify({
            "sentiment": sentiment,
            "score": score
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/save", methods=["POST"])
def save():
    """Save mood log to Supabase database"""
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        text = data.get("text")
        sentiment = data.get("sentiment")
        score = data.get("score")
        
        if not all([user_id, text, sentiment, score is not None]):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Insert into Supabase
        result = supabase.table("mood_logs").insert({
            "user_id": user_id,
            "text": text,
            "sentiment": sentiment,
            "score": score
        }).execute()
        
        return jsonify({"status": "saved", "data": result.data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# User Management Endpoints
@app.route("/users", methods=["POST"])
def create_user():
    """Create a new user"""
    try:
        data = request.get_json()
        user_id = str(uuid.uuid4())
        
        user_data = {
            "id": user_id,
            "email": data.get("email"),
            "name": data.get("name"),
            "created_at": datetime.now().isoformat(),
            "user_type": data.get("user_type", "patient")
        }
        
        result = supabase.table("users").insert(user_data).execute()
        return jsonify({"status": "created", "user": result.data[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    """Get user profile"""
    try:
        result = supabase.table("users").select("*").eq("id", user_id).execute()
        if result.data:
            return jsonify({"user": result.data[0]})
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    """Update user profile"""
    try:
        data = request.get_json()
        result = supabase.table("users").update(data).eq("id", user_id).execute()
        return jsonify({"status": "updated", "user": result.data[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Analytics Endpoints
@app.route("/analytics/<user_id>", methods=["GET"])
def get_user_analytics(user_id):
    """Get user analytics and insights"""
    try:
        # Get mood logs for the user
        mood_logs = supabase.table("mood_logs").select("*").eq("user_id", user_id).execute()
        
        if not mood_logs.data:
            return jsonify({"analytics": {
                "total_entries": 0,
                "average_score": 0,
                "positive_days": 0,
                "negative_days": 0,
                "neutral_days": 0,
                "streak": 0,
                "trend": "neutral"
            }})
        
        # Calculate analytics
        total_entries = len(mood_logs.data)
        scores = [log["score"] for log in mood_logs.data]
        average_score = sum(scores) / len(scores) if scores else 0
        
        sentiments = [log["sentiment"] for log in mood_logs.data]
        positive_days = sentiments.count("positive")
        negative_days = sentiments.count("negative")
        neutral_days = sentiments.count("neutral")
        
        # Calculate streak (simplified)
        streak = 1
        for i in range(1, len(mood_logs.data)):
            prev_date = datetime.fromisoformat(mood_logs.data[i-1]["created_at"].replace('Z', '+00:00'))
            curr_date = datetime.fromisoformat(mood_logs.data[i]["created_at"].replace('Z', '+00:00'))
            if (prev_date - curr_date).days == 1:
                streak += 1
            else:
                break
        
        # Determine trend
        recent_scores = scores[-7:] if len(scores) >= 7 else scores
        if len(recent_scores) >= 2:
            trend = "positive" if recent_scores[-1] > recent_scores[0] else "negative"
        else:
            trend = "neutral"
        
        analytics = {
            "total_entries": total_entries,
            "average_score": round(average_score, 2),
            "positive_days": positive_days,
            "negative_days": negative_days,
            "neutral_days": neutral_days,
            "streak": streak,
            "trend": trend
        }
        
        return jsonify({"analytics": analytics})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# AI Insights Endpoint
@app.route("/insights/<user_id>", methods=["GET"])
def get_ai_insights(user_id):
    """Get AI-generated insights for user"""
    try:
        # Get recent mood logs
        mood_logs = supabase.table("mood_logs").select("*").eq("user_id", user_id).order("created_at", desc=True).limit(30).execute()
        
        if not mood_logs.data:
            return jsonify({"insights": []})
        
        insights = []
        
        # Analyze patterns
        sentiments = [log["sentiment"] for log in mood_logs.data]
        scores = [log["score"] for log in mood_logs.data]
        
        # Positive trend insight
        if len(scores) >= 7:
            recent_avg = sum(scores[:7]) / 7
            older_avg = sum(scores[7:14]) / 7 if len(scores) >= 14 else recent_avg
            if recent_avg > older_avg + 0.1:
                insights.append({
                    "type": "positive_trend",
                    "title": "Improving Mood",
                    "message": "Your mood has been trending positive over the last week!",
                    "confidence": 0.8
                })
        
        # Consistency insight
        if len(mood_logs.data) >= 7:
            insights.append({
                "type": "consistency",
                "title": "Great Consistency",
                "message": "You're doing a great job logging your mood regularly!",
                "confidence": 0.9
            })
        
        # Pattern insights
        positive_count = sentiments.count("positive")
        if positive_count > len(sentiments) * 0.7:
            insights.append({
                "type": "pattern",
                "title": "Positive Pattern",
                "message": "You tend to have positive moods. Keep up the great work!",
                "confidence": 0.7
            })
        
        return jsonify({"insights": insights})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Notifications Endpoints
@app.route("/notifications/<user_id>", methods=["GET"])
def get_notifications(user_id):
    """Get user notifications"""
    try:
        result = supabase.table("notifications").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        return jsonify({"notifications": result.data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/notifications/<user_id>", methods=["POST"])
def create_notification(user_id):
    """Create a new notification"""
    try:
        data = request.get_json()
        notification_data = {
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "title": data.get("title"),
            "message": data.get("message"),
            "type": data.get("type", "general"),
            "priority": data.get("priority", "medium"),
            "read": False,
            "created_at": datetime.now().isoformat()
        }
        
        result = supabase.table("notifications").insert(notification_data).execute()
        return jsonify({"status": "created", "notification": result.data[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/notifications/<notification_id>/read", methods=["PUT"])
def mark_notification_read(notification_id):
    """Mark notification as read"""
    try:
        result = supabase.table("notifications").update({"read": True}).eq("id", notification_id).execute()
        return jsonify({"status": "updated"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Data Export Endpoint
@app.route("/export/<user_id>", methods=["GET"])
def export_user_data(user_id):
    """Export user data"""
    try:
        # Get all user data
        user = supabase.table("users").select("*").eq("id", user_id).execute()
        mood_logs = supabase.table("mood_logs").select("*").eq("user_id", user_id).execute()
        notifications = supabase.table("notifications").select("*").eq("user_id", user_id).execute()
        
        export_data = {
            "user": user.data[0] if user.data else None,
            "mood_logs": mood_logs.data,
            "notifications": notifications.data,
            "export_date": datetime.now().isoformat(),
            "format": "JSON"
        }
        
        return jsonify(export_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Admin Endpoints
@app.route("/admin/users", methods=["GET"])
def get_all_users():
    """Get all users (admin only)"""
    try:
        result = supabase.table("users").select("*").execute()
        return jsonify({"users": result.data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/admin/analytics", methods=["GET"])
def get_admin_analytics():
    """Get platform analytics (admin only)"""
    try:
        # Get platform statistics
        users = supabase.table("users").select("*").execute()
        mood_logs = supabase.table("mood_logs").select("*").execute()
        
        total_users = len(users.data)
        total_mood_logs = len(mood_logs.data)
        
        # Calculate average mood score
        if mood_logs.data:
            avg_score = sum(log["score"] for log in mood_logs.data) / len(mood_logs.data)
        else:
            avg_score = 0
        
        analytics = {
            "total_users": total_users,
            "total_mood_logs": total_mood_logs,
            "average_mood_score": round(avg_score, 2),
            "active_users": len(set(log["user_id"] for log in mood_logs.data))
        }
        
        return jsonify({"analytics": analytics})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Authentication Endpoints
@app.route("/auth/register", methods=["POST"])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")
        user_type = data.get("user_type", "patient")
        
        if not all([email, password, name]):
            return jsonify({"error": "Email, password, and name are required"}), 400
        
        result = register_user(email, password, name, user_type)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/auth/login", methods=["POST"])
def login():
    """Login user"""
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        
        if not all([email, password]):
            return jsonify({"error": "Email and password are required"}), 400
        
        result = login_user(email, password)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@app.route("/auth/verify-email", methods=["POST"])
def verify_email():
    """Verify email address"""
    try:
        data = request.get_json()
        token = data.get("token")
        
        if not token:
            return jsonify({"error": "Token is required"}), 400
        
        success = verify_email_token(token)
        if success:
            return jsonify({"message": "Email verified successfully"})
        else:
            return jsonify({"error": "Invalid or expired token"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/auth/forgot-password", methods=["POST"])
def forgot_password():
    """Request password reset"""
    try:
        data = request.get_json()
        email = data.get("email")
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        success = request_password_reset(email)
        return jsonify({"message": "Password reset email sent"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/auth/reset-password", methods=["POST"])
def reset_password_endpoint():
    """Reset password"""
    try:
        data = request.get_json()
        token = data.get("token")
        new_password = data.get("new_password")
        
        if not all([token, new_password]):
            return jsonify({"error": "Token and new password are required"}), 400
        
        success = reset_password(token, new_password)
        if success:
            return jsonify({"message": "Password reset successfully"})
        else:
            return jsonify({"error": "Invalid or expired token"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/auth/change-password", methods=["POST"])
@require_auth
def change_password_endpoint(user):
    """Change password for authenticated user"""
    try:
        data = request.get_json()
        current_password = data.get("current_password")
        new_password = data.get("new_password")
        
        if not all([current_password, new_password]):
            return jsonify({"error": "Current password and new password are required"}), 400
        
        success = change_password(user["user_id"], current_password, new_password)
        if success:
            return jsonify({"message": "Password changed successfully"})
        else:
            return jsonify({"error": "Current password is incorrect"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/auth/logout", methods=["POST"])
@require_auth
def logout(user):
    """Logout user"""
    try:
        success = logout_user(user["user_id"])
        return jsonify({"message": "Logged out successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/auth/me", methods=["GET"])
@require_auth
def get_current_user_info(user):
    """Get current user information"""
    try:
        result = supabase.table("users").select("*").eq("id", user["user_id"]).execute()
        if result.data:
            user_data = result.data[0]
            return jsonify({
                "user": {
                    "id": user_data["id"],
                    "email": user_data["email"],
                    "name": user_data["name"],
                    "user_type": user_data["user_type"],
                    "email_verified": user_data.get("email_verified", False),
                    "created_at": user_data["created_at"],
                    "last_login": user_data.get("last_login")
                }
            })
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "MoodMate AI Backend is running"})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
