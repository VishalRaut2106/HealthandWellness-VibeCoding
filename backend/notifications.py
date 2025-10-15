"""
Notification system for MoodMate AI
Handles email notifications, push notifications, and real-time updates
"""

import os
import smtplib
import json
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from supabase import create_client, Client
from dotenv import load_dotenv
import requests
import uuid

load_dotenv()

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"), 
    os.getenv("SUPABASE_KEY")
)

# Email Configuration
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@moodmate.ai")

# Push Notification Configuration
FCM_SERVER_KEY = os.getenv("FCM_SERVER_KEY")
FCM_URL = "https://fcm.googleapis.com/fcm/send"

class NotificationService:
    """Service for handling all types of notifications"""
    
    def __init__(self):
        self.smtp_server = None
        self._connect_smtp()
    
    def _connect_smtp(self):
        """Connect to SMTP server"""
        try:
            self.smtp_server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            self.smtp_server.starttls()
            self.smtp_server.login(SMTP_USERNAME, SMTP_PASSWORD)
        except Exception as e:
            print(f"SMTP connection failed: {e}")
            self.smtp_server = None
    
    def send_email_notification(self, user_id: str, notification_type: str, data: dict) -> bool:
        """Send email notification to user"""
        try:
            # Get user information
            user_result = supabase.table("users").select("*").eq("id", user_id).execute()
            if not user_result.data:
                return False
            
            user = user_result.data[0]
            
            # Get user notification preferences
            settings_result = supabase.table("user_settings").select("*").eq("user_id", user_id).execute()
            settings = settings_result.data[0] if settings_result.data else {}
            
            # Check if email notifications are enabled
            if not settings.get("notifications_email", True):
                return False
            
            # Create email content based on notification type
            email_content = self._create_email_content(notification_type, data, user)
            
            # Send email
            success = self._send_email(user["email"], email_content["subject"], email_content["body"])
            
            if success:
                # Log notification in database
                self._log_notification(user_id, notification_type, "email", data)
            
            return success
            
        except Exception as e:
            print(f"Email notification failed: {e}")
            return False
    
    def send_push_notification(self, user_id: str, notification_type: str, data: dict) -> bool:
        """Send push notification to user"""
        try:
            # Get user's FCM tokens
            tokens_result = supabase.table("user_fcm_tokens").select("token").eq("user_id", user_id).execute()
            if not tokens_result.data:
                return False
            
            # Get user notification preferences
            settings_result = supabase.table("user_settings").select("*").eq("user_id", user_id).execute()
            settings = settings_result.data[0] if settings_result.data else {}
            
            # Check if push notifications are enabled
            if not settings.get("notifications_push", True):
                return False
            
            # Create push notification payload
            payload = self._create_push_payload(notification_type, data)
            
            # Send to all user's devices
            success_count = 0
            for token_data in tokens_result.data:
                if self._send_fcm_notification(token_data["token"], payload):
                    success_count += 1
            
            if success_count > 0:
                # Log notification in database
                self._log_notification(user_id, notification_type, "push", data)
                return True
            
            return False
            
        except Exception as e:
            print(f"Push notification failed: {e}")
            return False
    
    def send_in_app_notification(self, user_id: str, notification_type: str, data: dict) -> bool:
        """Create in-app notification"""
        try:
            notification_data = {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "title": data.get("title", ""),
                "message": data.get("message", ""),
                "type": notification_type,
                "priority": data.get("priority", "medium"),
                "read": False,
                "action_url": data.get("action_url"),
                "metadata": json.dumps(data.get("metadata", {})),
                "created_at": datetime.now().isoformat()
            }
            
            result = supabase.table("notifications").insert(notification_data).execute()
            return len(result.data) > 0
            
        except Exception as e:
            print(f"In-app notification failed: {e}")
            return False
    
    def send_notification(self, user_id: str, notification_type: str, data: dict, channels: list = ["in_app"]) -> bool:
        """Send notification through specified channels"""
        success = False
        
        for channel in channels:
            if channel == "email":
                success |= self.send_email_notification(user_id, notification_type, data)
            elif channel == "push":
                success |= self.send_push_notification(user_id, notification_type, data)
            elif channel == "in_app":
                success |= self.send_in_app_notification(user_id, notification_type, data)
        
        return success
    
    def _create_email_content(self, notification_type: str, data: dict, user: dict) -> dict:
        """Create email content based on notification type"""
        templates = {
            "mood_reminder": {
                "subject": "Time to log your mood!",
                "body": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #4F46E5;">MoodMate AI</h1>
                        </div>
                        
                        <h2>Hi {user['name']},</h2>
                        
                        <p>It's time to check in with yourself! How are you feeling today?</p>
                        
                        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; font-size: 18px; text-align: center;">
                                <strong>Take a moment to reflect on your day and log your mood.</strong>
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/log-mood" 
                               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                Log My Mood
                            </a>
                        </div>
                        
                        <p>Regular mood tracking helps you understand your emotional patterns and build better mental health habits.</p>
                        
                        <p>Best regards,<br>The MoodMate AI Team</p>
                        
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
                        <p style="font-size: 12px; color: #6B7280; text-align: center;">
                            You can manage your notification preferences in your account settings.
                        </p>
                    </div>
                </body>
                </html>
                """
            },
            "achievement": {
                "subject": "🎉 Achievement Unlocked!",
                "body": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #4F46E5;">MoodMate AI</h1>
                        </div>
                        
                        <h2>Congratulations, {user['name']}! 🎉</h2>
                        
                        <p>You've earned a new achievement:</p>
                        
                        <div style="background-color: #FEF3C7; border: 2px solid #F59E0B; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                            <h3 style="color: #92400E; margin: 0;">{data.get('title', 'New Achievement')}</h3>
                            <p style="color: #92400E; margin: 10px 0 0 0;">{data.get('description', 'Great job!')}</p>
                        </div>
                        
                        <p>Keep up the excellent work! Your commitment to mental health tracking is making a real difference.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/profile" 
                               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                View Achievements
                            </a>
                        </div>
                        
                        <p>Best regards,<br>The MoodMate AI Team</p>
                    </div>
                </body>
                </html>
                """
            },
            "weekly_report": {
                "subject": "Your Weekly Mood Report",
                "body": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #4F46E5;">MoodMate AI</h1>
                        </div>
                        
                        <h2>Hi {user['name']},</h2>
                        
                        <p>Here's your weekly mood summary:</p>
                        
                        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0;">This Week's Highlights</h3>
                            <ul>
                                <li>You logged {data.get('total_entries', 0)} mood entries</li>
                                <li>Average mood score: {data.get('average_score', 0):.1%}</li>
                                <li>Positive days: {data.get('positive_days', 0)}</li>
                                <li>Current streak: {data.get('streak', 0)} days</li>
                            </ul>
                        </div>
                        
                        {data.get('insights', []) and f'''
                        <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 15px; margin: 20px 0;">
                            <h4 style="margin-top: 0; color: #1E40AF;">AI Insights</h4>
                            <p style="margin: 0;">{data.get('insights', [{}])[0].get('message', 'Keep up the great work!')}</p>
                        </div>
                        ''' or ''}
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/dashboard" 
                               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                View Full Report
                            </a>
                        </div>
                        
                        <p>Keep tracking your mood to build better mental health habits!</p>
                        
                        <p>Best regards,<br>The MoodMate AI Team</p>
                    </div>
                </body>
                </html>
                """
            },
            "crisis_alert": {
                "subject": "Mental Health Resources - You're Not Alone",
                "body": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #4F46E5;">MoodMate AI</h1>
                        </div>
                        
                        <h2>Hi {user['name']},</h2>
                        
                        <p>We noticed you might be going through a difficult time. Remember, you're not alone, and help is available.</p>
                        
                        <div style="background-color: #FEF2F2; border: 2px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #DC2626; margin-top: 0;">Immediate Support</h3>
                            <ul style="color: #DC2626;">
                                <li><strong>National Suicide Prevention Lifeline:</strong> 988</li>
                                <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                                <li><strong>Emergency Services:</strong> 911</li>
                            </ul>
                        </div>
                        
                        <div style="background-color: #F0F9FF; border-left: 4px solid #0EA5E9; padding: 15px; margin: 20px 0;">
                            <h4 style="margin-top: 0; color: #0C4A6E;">Professional Help</h4>
                            <p style="margin: 0;">Consider reaching out to a mental health professional. They can provide the support and guidance you need.</p>
                        </div>
                        
                        <p>Your mental health matters. Please don't hesitate to reach out for help.</p>
                        
                        <p>With care,<br>The MoodMate AI Team</p>
                    </div>
                </body>
                </html>
                """
            }
        }
        
        return templates.get(notification_type, {
            "subject": data.get("title", "Notification from MoodMate AI"),
            "body": f"<html><body><h2>{data.get('title', 'Notification')}</h2><p>{data.get('message', 'You have a new notification.')}</p></body></html>"
        })
    
    def _create_push_payload(self, notification_type: str, data: dict) -> dict:
        """Create push notification payload"""
        return {
            "notification": {
                "title": data.get("title", "MoodMate AI"),
                "body": data.get("message", "You have a new notification"),
                "icon": "/icon-192x192.png",
                "badge": "/badge-72x72.png"
            },
            "data": {
                "type": notification_type,
                "action_url": data.get("action_url"),
                "metadata": json.dumps(data.get("metadata", {}))
            }
        }
    
    def _send_email(self, to_email: str, subject: str, body: str) -> bool:
        """Send email using SMTP"""
        try:
            if not self.smtp_server:
                self._connect_smtp()
                if not self.smtp_server:
                    return False
            
            msg = MIMEMultipart('alternative')
            msg['From'] = FROM_EMAIL
            msg['To'] = to_email
            msg['Subject'] = subject
            
            html_part = MIMEText(body, 'html')
            msg.attach(html_part)
            
            self.smtp_server.sendmail(FROM_EMAIL, to_email, msg.as_string())
            return True
            
        except Exception as e:
            print(f"Email sending failed: {e}")
            return False
    
    def _send_fcm_notification(self, token: str, payload: dict) -> bool:
        """Send FCM push notification"""
        try:
            if not FCM_SERVER_KEY:
                return False
            
            headers = {
                'Authorization': f'key={FCM_SERVER_KEY}',
                'Content-Type': 'application/json'
            }
            
            data = {
                'to': token,
                **payload
            }
            
            response = requests.post(FCM_URL, headers=headers, json=data)
            return response.status_code == 200
            
        except Exception as e:
            print(f"FCM notification failed: {e}")
            return False
    
    def _log_notification(self, user_id: str, notification_type: str, channel: str, data: dict):
        """Log notification in database"""
        try:
            log_data = {
                "user_id": user_id,
                "notification_type": notification_type,
                "channel": channel,
                "data": json.dumps(data),
                "sent_at": datetime.now().isoformat()
            }
            
            supabase.table("notification_logs").insert(log_data).execute()
            
        except Exception as e:
            print(f"Notification logging failed: {e}")
    
    def schedule_mood_reminders(self):
        """Schedule daily mood reminders for all users"""
        try:
            # Get users who have mood reminders enabled
            users_result = supabase.table("user_settings").select("user_id, mood_reminder_time").eq("notifications_mood_reminder", True).execute()
            
            for user_setting in users_result.data:
                user_id = user_setting["user_id"]
                reminder_time = user_setting.get("mood_reminder_time", "20:00:00")
                
                # Check if user hasn't logged mood today
                today = datetime.now().date()
                mood_logs = supabase.table("mood_logs").select("id").eq("user_id", user_id).gte("created_at", today.isoformat()).execute()
                
                if not mood_logs.data:
                    # Send mood reminder
                    self.send_notification(
                        user_id=user_id,
                        notification_type="mood_reminder",
                        data={
                            "title": "Time to log your mood!",
                            "message": "How are you feeling today? Take a moment to reflect and log your mood.",
                            "priority": "high"
                        },
                        channels=["email", "push", "in_app"]
                    )
            
            return True
            
        except Exception as e:
            print(f"Mood reminder scheduling failed: {e}")
            return False
    
    def send_weekly_reports(self):
        """Send weekly reports to all users"""
        try:
            # Get users who have weekly reports enabled
            users_result = supabase.table("user_settings").select("user_id").eq("notifications_weekly_report", True).execute()
            
            for user_setting in users_result.data:
                user_id = user_setting["user_id"]
                
                # Get user's weekly data
                week_ago = datetime.now() - timedelta(days=7)
                mood_logs = supabase.table("mood_logs").select("*").eq("user_id", user_id).gte("created_at", week_ago.isoformat()).execute()
                
                if mood_logs.data:
                    # Calculate weekly statistics
                    scores = [log["score"] for log in mood_logs.data]
                    sentiments = [log["sentiment"] for log in mood_logs.data]
                    
                    weekly_data = {
                        "total_entries": len(mood_logs.data),
                        "average_score": sum(scores) / len(scores) if scores else 0,
                        "positive_days": sentiments.count("positive"),
                        "negative_days": sentiments.count("negative"),
                        "neutral_days": sentiments.count("neutral"),
                        "streak": self._calculate_streak(user_id)
                    }
                    
                    # Send weekly report
                    self.send_notification(
                        user_id=user_id,
                        notification_type="weekly_report",
                        data={
                            "title": "Your Weekly Mood Report",
                            "message": f"You logged {weekly_data['total_entries']} mood entries this week!",
                            "priority": "medium",
                            **weekly_data
                        },
                        channels=["email", "in_app"]
                    )
            
            return True
            
        except Exception as e:
            print(f"Weekly report sending failed: {e}")
            return False
    
    def _calculate_streak(self, user_id: str) -> int:
        """Calculate user's current streak"""
        try:
            mood_logs = supabase.table("mood_logs").select("created_at").eq("user_id", user_id).order("created_at", desc=True).execute()
            
            if not mood_logs.data:
                return 0
            
            streak = 0
            current_date = datetime.now().date()
            
            for log in mood_logs.data:
                log_date = datetime.fromisoformat(log["created_at"].replace('Z', '+00:00')).date()
                if log_date == current_date or log_date == current_date - timedelta(days=streak):
                    streak += 1
                    current_date = log_date
                else:
                    break
            
            return streak
            
        except Exception as e:
            print(f"Streak calculation failed: {e}")
            return 0

# Global notification service instance
notification_service = NotificationService()
