-- MoodMate AI Database Schema
-- This schema defines all the tables needed for the mental health tracking application

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) DEFAULT 'patient' CHECK (user_type IN ('patient', 'admin', 'therapist')),
    bio TEXT,
    avatar_url VARCHAR(500),
    date_of_birth DATE,
    gender VARCHAR(20),
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    phone_number VARCHAR(20),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20)
);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(20) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
    notifications_email BOOLEAN DEFAULT true,
    notifications_push BOOLEAN DEFAULT true,
    notifications_weekly_report BOOLEAN DEFAULT true,
    notifications_mood_reminder BOOLEAN DEFAULT true,
    notifications_crisis_alerts BOOLEAN DEFAULT true,
    data_sharing BOOLEAN DEFAULT false,
    analytics_enabled BOOLEAN DEFAULT true,
    profile_visibility VARCHAR(20) DEFAULT 'private' CHECK (profile_visibility IN ('private', 'friends', 'public')),
    mood_reminder_time TIME DEFAULT '20:00:00',
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood logs table
CREATE TABLE IF NOT EXISTS mood_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    sentiment VARCHAR(20) NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
    score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 1),
    emoji VARCHAR(10),
    tags TEXT[], -- Array of tags like ['work', 'family', 'exercise']
    mood_intensity INTEGER CHECK (mood_intensity >= 1 AND mood_intensity <= 10),
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
    stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
    activities TEXT[], -- Array of activities like ['exercise', 'meditation', 'social']
    weather VARCHAR(50),
    location VARCHAR(255),
    is_private BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    category VARCHAR(50) DEFAULT 'general' CHECK (category IN ('streak', 'mood', 'consistency', 'milestone', 'special')),
    criteria JSONB, -- JSON object defining how to earn the achievement
    points INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements table (junction table)
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress JSONB, -- Track progress towards achievement
    UNIQUE(user_id, achievement_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'general' CHECK (type IN ('mood_reminder', 'achievement', 'insight', 'chat', 'reminder', 'alert', 'general')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    read BOOLEAN DEFAULT false,
    action_url VARCHAR(500),
    metadata JSONB, -- Additional data for the notification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'mood' CHECK (category IN ('mood', 'wellness', 'social', 'professional', 'personal')),
    target_value INTEGER,
    current_value INTEGER DEFAULT 0,
    unit VARCHAR(50), -- e.g., 'days', 'entries', 'hours'
    target_date DATE,
    is_completed BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- AI insights table
CREATE TABLE IF NOT EXISTS ai_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('trend', 'pattern', 'recommendation', 'warning', 'celebration')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
    data_points JSONB, -- Supporting data for the insight
    is_read BOOLEAN DEFAULT false,
    is_helpful BOOLEAN, -- User feedback on insight usefulness
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- Mental health resources table
CREATE TABLE IF NOT EXISTS mental_health_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('crisis', 'therapy', 'meditation', 'exercise', 'education', 'community')),
    resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('article', 'video', 'audio', 'app', 'website', 'phone', 'chat')),
    url VARCHAR(500),
    phone VARCHAR(20),
    is_emergency BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User resource interactions
CREATE TABLE IF NOT EXISTS user_resource_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES mental_health_resources(id) ON DELETE CASCADE,
    interaction_type VARCHAR(50) CHECK (interaction_type IN ('viewed', 'clicked', 'shared', 'saved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions table (for AI chatbot)
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'ai', 'system')),
    message_type VARCHAR(50) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'audio', 'video', 'file')),
    metadata JSONB, -- Additional message data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crisis interventions table
CREATE TABLE IF NOT EXISTS crisis_interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    trigger_type VARCHAR(50) NOT NULL CHECK (trigger_type IN ('mood_score', 'keywords', 'pattern', 'manual')),
    trigger_data JSONB, -- Data that triggered the intervention
    intervention_type VARCHAR(50) NOT NULL CHECK (intervention_type IN ('notification', 'resource', 'contact', 'escalation')),
    action_taken TEXT,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_id ON mood_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_logs_created_at ON mood_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_mood_logs_sentiment ON mood_logs(sentiment);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_user_id ON ai_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mood_logs_updated_at BEFORE UPDATE ON mood_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mental_health_resources_updated_at BEFORE UPDATE ON mental_health_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default achievements
INSERT INTO achievements (name, description, icon, category, criteria, points) VALUES
('First Entry', 'Log your first mood entry', '🎯', 'milestone', '{"type": "mood_entries", "count": 1}', 10),
('Week Warrior', 'Log mood for 7 consecutive days', '📅', 'streak', '{"type": "consecutive_days", "count": 7}', 50),
('Month Master', 'Log mood for 30 consecutive days', '🏆', 'streak', '{"type": "consecutive_days", "count": 30}', 200),
('Positive Thinker', 'Have 10 positive mood entries', '😊', 'mood', '{"type": "positive_entries", "count": 10}', 100),
('Consistent Logger', 'Log mood for 14 consecutive days', '📊', 'consistency', '{"type": "consecutive_days", "count": 14}', 75),
('Insight Seeker', 'View 50 AI insights', '🧠', 'milestone', '{"type": "insights_viewed", "count": 50}', 150),
('Chat Companion', 'Have 10 conversations with AI', '💬', 'milestone', '{"type": "chat_sessions", "count": 10}', 75),
('Resource Explorer', 'View 20 mental health resources', '📚', 'milestone', '{"type": "resources_viewed", "count": 20}', 100);

-- Insert default mental health resources
INSERT INTO mental_health_resources (title, description, category, resource_type, url, is_emergency, tags) VALUES
('National Suicide Prevention Lifeline', '24/7 crisis support and suicide prevention', 'crisis', 'phone', NULL, true, ARRAY['crisis', 'suicide', 'emergency']),
('Crisis Text Line', 'Text HOME to 741741 for crisis support', 'crisis', 'phone', NULL, true, ARRAY['crisis', 'text', 'emergency']),
('SAMHSA National Helpline', 'Mental health and substance abuse treatment referral', 'crisis', 'phone', 'https://www.samhsa.gov/find-help/national-helpline', true, ARRAY['crisis', 'substance', 'treatment']),
('Headspace', 'Meditation and mindfulness app', 'meditation', 'app', 'https://www.headspace.com', false, ARRAY['meditation', 'mindfulness', 'app']),
('Calm', 'Sleep, meditation and relaxation app', 'meditation', 'app', 'https://www.calm.com', false, ARRAY['meditation', 'sleep', 'relaxation']),
('BetterHelp', 'Online therapy platform', 'therapy', 'website', 'https://www.betterhelp.com', false, ARRAY['therapy', 'counseling', 'online']),
('Talkspace', 'Online therapy and psychiatry', 'therapy', 'website', 'https://www.talkspace.com', false, ARRAY['therapy', 'psychiatry', 'online']),
('Mindfulness-Based Stress Reduction', 'Evidence-based stress reduction program', 'education', 'website', 'https://www.umassmed.edu/cfm/mindfulness-based-programs/', false, ARRAY['mindfulness', 'stress', 'education']);

-- Create views for common queries
CREATE VIEW user_mood_summary AS
SELECT 
    u.id as user_id,
    u.name,
    COUNT(ml.id) as total_entries,
    AVG(ml.score) as average_score,
    COUNT(CASE WHEN ml.sentiment = 'positive' THEN 1 END) as positive_days,
    COUNT(CASE WHEN ml.sentiment = 'negative' THEN 1 END) as negative_days,
    COUNT(CASE WHEN ml.sentiment = 'neutral' THEN 1 END) as neutral_days,
    MAX(ml.created_at) as last_entry
FROM users u
LEFT JOIN mood_logs ml ON u.id = ml.user_id
GROUP BY u.id, u.name;

CREATE VIEW user_achievement_progress AS
SELECT 
    ua.user_id,
    ua.achievement_id,
    a.name as achievement_name,
    a.description,
    a.criteria,
    ua.earned_at,
    ua.progress
FROM user_achievements ua
JOIN achievements a ON ua.achievement_id = a.id;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;
