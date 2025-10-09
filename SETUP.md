# MoodMate AI - Setup Guide

This guide will help you set up the complete MoodMate AI application with all its components.

## 🚀 Quick Start

### 1. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and API keys

2. **Set up Database Schema**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the SQL from `backend/supabase-schema.sql`

3. **Get API Keys**
   - Go to Settings > API
   - Copy your project URL and anon key

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create `.env` file:
```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_service_role_key_here
PORT=5000
```

Start the backend:
```bash
python app.py
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `NEXT_PUBLIC_BACKEND_URL`: Flask backend URL (default: http://localhost:5000)

#### Backend (.env)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase service role key
- `PORT`: Backend port (default: 5000)

### Database Schema

The application uses two main tables:

1. **users**: Stores user profiles
   - `id` (UUID, Primary Key)
   - `email` (text)
   - `created_at`, `updated_at` (timestamps)

2. **mood_logs**: Stores mood entries
   - `id` (bigint, auto-increment)
   - `user_id` (UUID, Foreign Key)
   - `text` (text) - User's journal entry
   - `sentiment` (text) - AI analysis result
   - `score` (decimal) - Confidence score
   - `created_at` (timestamp)

## 🚀 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Render)

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy as a Web Service

### Database (Supabase)

Your database is already hosted on Supabase cloud.

## 🧪 Testing

### Test the Backend

```bash
# Health check
curl http://localhost:5000/health

# Test sentiment analysis
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I am feeling great today!"}'
```

### Test the Frontend

1. Open http://localhost:3000
2. Sign up for a new account
3. Log a mood entry
4. Check the dashboard and insights

## 🔒 Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Authentication**: Supabase handles user authentication
- **Privacy**: All data is encrypted and private
- **Environment Variables**: Sensitive data stored securely

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure the backend is running on the correct port
   - Check that `NEXT_PUBLIC_BACKEND_URL` is correct

2. **Authentication Issues**
   - Verify Supabase URL and keys are correct
   - Check that RLS policies are set up properly

3. **Model Loading Issues**
   - The first run may take time to download the model
   - Ensure you have sufficient disk space

4. **Database Connection Issues**
   - Verify Supabase credentials
   - Check that the database schema is set up correctly

### Getting Help

- Check the console for error messages
- Verify all environment variables are set
- Ensure all dependencies are installed
- Check Supabase logs in the dashboard

## 📱 Features

- ✅ Secure user authentication
- ✅ Private mood logging
- ✅ AI sentiment analysis
- ✅ Mood trends visualization
- ✅ Personalized insights
- ✅ Responsive design
- ✅ Privacy-focused architecture

## 🎨 Customization

### Colors
The app uses a calm color palette defined in `tailwind.config.ts`:
- Mint: `#A7F3D0`
- Sky: `#BFDBFE`
- Rose: `#FBCFE8`

### Fonts
- Primary: Inter (Google Fonts)

### Components
All UI components are in `src/components/ui/` and can be customized.

## 📊 Analytics

The app provides:
- Mood trend charts
- Sentiment analysis
- Personal insights
- Pattern recognition
- Weekly/monthly summaries

## 🔄 Updates

To update the application:
1. Pull latest changes
2. Update dependencies: `npm install` (frontend) / `pip install -r requirements.txt` (backend)
3. Restart services
4. Check for any new environment variables

## 📝 Notes

- The AI model is loaded locally for privacy
- All data is stored securely in Supabase
- The app is designed to be fully privacy-focused
- No external API keys are required for the AI analysis
