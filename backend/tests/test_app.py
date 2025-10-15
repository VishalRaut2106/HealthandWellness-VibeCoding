"""
Test suite for MoodMate AI backend
"""

import unittest
import json
from unittest.mock import patch, MagicMock
import sys
import os

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app

class TestMoodMateAPI(unittest.TestCase):
    """Test cases for the MoodMate AI API"""
    
    def setUp(self):
        """Set up test client"""
        self.app = app.test_client()
        self.app.testing = True
    
    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = self.app.get('/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
    
    @patch('app.supabase')
    def test_analyze_sentiment_success(self, mock_supabase):
        """Test sentiment analysis endpoint with valid input"""
        test_data = {
            "text": "I'm feeling great today!"
        }
        
        response = self.app.post('/analyze', 
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('sentiment', data)
        self.assertIn('score', data)
        self.assertIsInstance(data['score'], float)
    
    def test_analyze_sentiment_no_text(self):
        """Test sentiment analysis with no text provided"""
        test_data = {}
        
        response = self.app.post('/analyze',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    @patch('app.supabase')
    def test_save_mood_log_success(self, mock_supabase):
        """Test saving mood log with valid data"""
        mock_supabase.table.return_value.insert.return_value.execute.return_value.data = [{"id": "test-id"}]
        
        test_data = {
            "user_id": "test-user",
            "text": "Feeling good today",
            "sentiment": "positive",
            "score": 0.85
        }
        
        response = self.app.post('/save',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'saved')
    
    def test_save_mood_log_missing_fields(self):
        """Test saving mood log with missing required fields"""
        test_data = {
            "user_id": "test-user",
            "text": "Feeling good today"
            # Missing sentiment and score
        }
        
        response = self.app.post('/save',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    @patch('app.supabase')
    def test_get_user_analytics_success(self, mock_supabase):
        """Test getting user analytics with valid user"""
        mock_mood_logs = [
            {"sentiment": "positive", "score": 0.8, "created_at": "2024-01-01T00:00:00Z"},
            {"sentiment": "positive", "score": 0.7, "created_at": "2024-01-02T00:00:00Z"},
            {"sentiment": "negative", "score": 0.3, "created_at": "2024-01-03T00:00:00Z"}
        ]
        mock_supabase.table.return_value.select.return_value.eq.return_value.execute.return_value.data = mock_mood_logs
        
        response = self.app.get('/analytics/test-user')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('analytics', data)
        analytics = data['analytics']
        self.assertEqual(analytics['total_entries'], 3)
        self.assertEqual(analytics['positive_days'], 2)
        self.assertEqual(analytics['negative_days'], 1)
    
    @patch('app.supabase')
    def test_get_user_analytics_no_data(self, mock_supabase):
        """Test getting user analytics with no mood logs"""
        mock_supabase.table.return_value.select.return_value.eq.return_value.execute.return_value.data = []
        
        response = self.app.get('/analytics/test-user')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        analytics = data['analytics']
        self.assertEqual(analytics['total_entries'], 0)
        self.assertEqual(analytics['average_score'], 0)
    
    @patch('app.supabase')
    def test_get_ai_insights_success(self, mock_supabase):
        """Test getting AI insights for user"""
        mock_mood_logs = [
            {"sentiment": "positive", "score": 0.8, "created_at": "2024-01-01T00:00:00Z"},
            {"sentiment": "positive", "score": 0.9, "created_at": "2024-01-02T00:00:00Z"},
            {"sentiment": "positive", "score": 0.85, "created_at": "2024-01-03T00:00:00Z"}
        ]
        mock_supabase.table.return_value.select.return_value.eq.return_value.order.return_value.limit.return_value.execute.return_value.data = mock_mood_logs
        
        response = self.app.get('/insights/test-user')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('insights', data)
        self.assertIsInstance(data['insights'], list)
    
    @patch('app.supabase')
    def test_create_notification_success(self, mock_supabase):
        """Test creating notification for user"""
        mock_supabase.table.return_value.insert.return_value.execute.return_value.data = [{"id": "test-notification"}]
        
        test_data = {
            "title": "Test Notification",
            "message": "This is a test notification",
            "type": "general",
            "priority": "medium"
        }
        
        response = self.app.post('/notifications/test-user',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'created')
    
    @patch('app.supabase')
    def test_export_user_data_success(self, mock_supabase):
        """Test exporting user data"""
        mock_user = {"id": "test-user", "name": "Test User", "email": "test@example.com"}
        mock_mood_logs = [{"id": "log1", "text": "Feeling good", "sentiment": "positive", "score": 0.8}]
        mock_notifications = [{"id": "notif1", "title": "Test", "message": "Test message"}]
        
        mock_supabase.table.return_value.select.return_value.eq.return_value.execute.side_effect = [
            MagicMock(data=[mock_user]),
            MagicMock(data=mock_mood_logs),
            MagicMock(data=mock_notifications)
        ]
        
        response = self.app.get('/export/test-user')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('user', data)
        self.assertIn('mood_logs', data)
        self.assertIn('notifications', data)
        self.assertIn('export_date', data)
    
    @patch('app.supabase')
    def test_admin_get_all_users(self, mock_supabase):
        """Test admin endpoint to get all users"""
        mock_users = [
            {"id": "user1", "name": "User 1", "email": "user1@example.com"},
            {"id": "user2", "name": "User 2", "email": "user2@example.com"}
        ]
        mock_supabase.table.return_value.select.return_value.execute.return_value.data = mock_users
        
        response = self.app.get('/admin/users')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('users', data)
        self.assertEqual(len(data['users']), 2)
    
    @patch('app.supabase')
    def test_admin_analytics(self, mock_supabase):
        """Test admin analytics endpoint"""
        mock_users = [{"id": "user1"}, {"id": "user2"}]
        mock_mood_logs = [
            {"user_id": "user1", "score": 0.8},
            {"user_id": "user2", "score": 0.6}
        ]
        
        mock_supabase.table.return_value.select.return_value.execute.side_effect = [
            MagicMock(data=mock_users),
            MagicMock(data=mock_mood_logs)
        ]
        
        response = self.app.get('/admin/analytics')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('analytics', data)
        analytics = data['analytics']
        self.assertEqual(analytics['total_users'], 2)
        self.assertEqual(analytics['total_mood_logs'], 2)
        self.assertEqual(analytics['average_mood_score'], 0.7)

class TestAuthentication(unittest.TestCase):
    """Test cases for authentication endpoints"""
    
    def setUp(self):
        """Set up test client"""
        self.app = app.test_client()
        self.app.testing = True
    
    @patch('app.register_user')
    def test_register_success(self, mock_register):
        """Test user registration with valid data"""
        mock_register.return_value = {
            "user": {"id": "test-user", "email": "test@example.com", "name": "Test User"},
            "message": "Registration successful"
        }
        
        test_data = {
            "email": "test@example.com",
            "password": "password123",
            "name": "Test User",
            "user_type": "patient"
        }
        
        response = self.app.post('/auth/register',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('user', data)
        self.assertIn('message', data)
    
    def test_register_missing_fields(self):
        """Test registration with missing required fields"""
        test_data = {
            "email": "test@example.com"
            # Missing password and name
        }
        
        response = self.app.post('/auth/register',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    @patch('app.login_user')
    def test_login_success(self, mock_login):
        """Test user login with valid credentials"""
        mock_login.return_value = {
            "user": {"id": "test-user", "email": "test@example.com", "name": "Test User"},
            "token": "test-jwt-token",
            "expires_in": 86400
        }
        
        test_data = {
            "email": "test@example.com",
            "password": "password123"
        }
        
        response = self.app.post('/auth/login',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('user', data)
        self.assertIn('token', data)
    
    def test_login_missing_credentials(self):
        """Test login with missing credentials"""
        test_data = {
            "email": "test@example.com"
            # Missing password
        }
        
        response = self.app.post('/auth/login',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)

if __name__ == '__main__':
    unittest.main()
