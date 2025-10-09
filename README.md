# 🧠 MoodMate AI - Intelligent Mental Health Tracking Platform

<div align="center">

![MoodMate AI Logo](https://img.shields.io/badge/MoodMate-AI-22c55e?style=for-the-badge&logo=heart&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green?style=for-the-badge&logo=flask)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)

**A comprehensive mental health tracking platform with AI-powered insights, mood analytics, and admin dashboard for healthcare professionals.**

[🚀 Live Demo](https://your-demo-url.com) • [📖 Documentation](https://your-docs-url.com) • [🐛 Report Bug](https://github.com/your-username/moodmate-ai/issues) • [✨ Request Feature](https://github.com/your-username/moodmate-ai/issues)

</div>

---

## 🌟 Overview

MoodMate AI is a cutting-edge mental health tracking platform that combines modern web technologies with AI-powered insights to help users understand their emotional patterns and improve their mental wellbeing. The platform features separate interfaces for patients and healthcare administrators, providing comprehensive mood tracking, analytics, and professional oversight capabilities.

### 🎯 Key Features

- **🔐 Dual Authentication System** - Separate login flows for patients and administrators
- **📝 Intelligent Mood Logging** - AI-powered sentiment analysis with privacy-first design
- **📊 Advanced Analytics Dashboard** - Comprehensive mood trends and pattern recognition
- **🤖 AI-Powered Insights** - Personalized recommendations and behavioral analysis
- **👨‍⚕️ Admin Dashboard** - Healthcare professional oversight and client monitoring
- **💬 Interactive Chatbot** - 24/7 mental health support and guidance
- **📱 Responsive Design** - Seamless experience across all devices
- **🛡️ Privacy-First Architecture** - End-to-end encryption and secure data handling

---

## 🏗️ Architecture

### Frontend (Next.js 15 + TypeScript)
- **Framework**: Next.js 15 with App Router
- **UI Library**: Custom components with Tailwind CSS 4
- **State Management**: React hooks with context
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization
- **Authentication**: Supabase Auth with role-based access

### Backend (Flask + Python)
- **API Framework**: Flask with CORS support
- **AI Processing**: Hugging Face Transformers (local processing)
- **Database**: Supabase PostgreSQL with Row Level Security
- **Authentication**: JWT tokens with Supabase
- **Security**: Environment-based configuration

### Database (Supabase)
- **Primary Database**: PostgreSQL with RLS policies
- **Authentication**: Built-in user management
- **Real-time**: Live data synchronization
- **Storage**: Secure file and data storage

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **Git** for version control
- **Supabase Account** (free tier available)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/moodmate-ai.git
cd moodmate-ai
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create environment file:
```bash
cp .env.example .env.local
```

### 3. Backend Setup

```bash
cd ../backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 4. Database Configuration

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `backend/supabase-schema.sql`
3. Get your project credentials from Settings > API

### 5. Environment Variables

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

**Backend** (`backend/.env`):
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
PORT=5000
```

### 6. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see your application! 🎉

---

## 📁 Project Structure

```
moodmate-ai/
├── 📁 frontend/                          # Next.js Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 app/                       # App Router Pages
│   │   │   ├── 📄 page.tsx               # Main application page
│   │   │   ├── 📄 layout.tsx             # Root layout
│   │   │   └── 📁 admin/                  # Admin dashboard pages
│   │   ├── 📁 components/                 # React Components
│   │   │   ├── 📁 auth/                  # Authentication components
│   │   │   ├── 📁 admin/                 # Admin dashboard components
│   │   │   ├── 📁 patient/               # Patient dashboard components
│   │   │   ├── 📁 mood/                  # Mood logging components
│   │   │   ├── 📁 dashboard/             # Analytics components
│   │   │   ├── 📁 insights/              # AI insights components
│   │   │   ├── 📁 chatbot/               # Chatbot components
│   │   │   ├── 📁 landing/               # Landing page components
│   │   │   ├── 📁 layout/                # Layout components
│   │   │   └── 📁 ui/                    # Reusable UI components
│   │   └── 📁 lib/                       # Utilities and configurations
│   ├── 📄 package.json                   # Frontend dependencies
│   ├── 📄 tailwind.config.ts             # Tailwind configuration
│   └── 📄 .env.local                     # Frontend environment variables
├── 📁 backend/                           # Flask Backend API
│   ├── 📄 app.py                         # Main Flask application
│   ├── 📄 requirements.txt               # Python dependencies
│   ├── 📄 supabase-schema.sql            # Database schema
│   └── 📄 .env                           # Backend environment variables
├── 📄 README.md                          # Project documentation
├── 📄 LICENSE                            # MIT License
└── 📄 .gitignore                         # Git ignore rules
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Calm Green (`#22c55e`) - Trust and growth
- **Mint**: `#A7F3D0` - Soothing and calming
- **Sky**: `#BFDBFE` - Peaceful and open
- **Rose**: `#FBCFE8` - Warm and caring
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Fluid typography scaling

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants with hover states
- **Forms**: Clean input fields with validation
- **Charts**: Interactive data visualizations
- **Animations**: Smooth transitions with Framer Motion

---

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Mood Tracking
- `POST /mood/log` - Log new mood entry
- `GET /mood/history` - Get mood history
- `PUT /mood/:id` - Update mood entry
- `DELETE /mood/:id` - Delete mood entry

### Analytics
- `GET /analytics/trends` - Get mood trends
- `GET /analytics/insights` - Get AI insights
- `GET /analytics/export` - Export user data

### Admin
- `GET /admin/clients` - Get all clients
- `GET /admin/stats` - Get platform statistics
- `GET /admin/client/:id` - Get client details

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  user_type TEXT CHECK (user_type IN ('patient', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Mood Logs Table
```sql
CREATE TABLE mood_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  text TEXT NOT NULL,
  sentiment TEXT NOT NULL,
  score FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id),
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure session management
- **Role-Based Access**: Separate patient and admin interfaces
- **Row Level Security**: Database-level access control
- **Password Hashing**: Secure password storage

### Data Protection
- **Encryption at Rest**: All data encrypted in database
- **HTTPS Only**: Secure data transmission
- **Environment Variables**: Sensitive data protection
- **Input Validation**: SQL injection prevention

### Privacy Compliance
- **GDPR Ready**: Data export and deletion
- **Local AI Processing**: No external API calls
- **Data Minimization**: Only necessary data collection
- **User Control**: Full data ownership

---

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test          # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript checks
```

### Backend Testing
```bash
cd backend
python -m pytest      # Run Python tests
python -m flake8      # Run code linting
```

### API Testing
```bash
# Health check
curl http://localhost:5000/health

# Test sentiment analysis
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I am feeling great today!"}'
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Railway)
1. Connect GitHub repository to hosting service
2. Set environment variables in dashboard
3. Deploy as web service with auto-scaling

### Database (Supabase)
- Already hosted on Supabase cloud
- Automatic backups and scaling
- Real-time subscriptions available

---

## 📊 Features Overview

### Patient Features
- **Mood Logging**: Daily mood tracking with AI analysis
- **Dashboard**: Personal analytics and trends
- **Insights**: AI-powered recommendations
- **Chatbot**: 24/7 mental health support
- **Export**: Data export for therapy sessions

### Admin Features
- **Client Overview**: Monitor all patients
- **Progress Tracking**: Individual client analytics
- **Platform Statistics**: Overall system health
- **Detailed Reports**: Comprehensive client insights

### AI Capabilities
- **Sentiment Analysis**: Real-time mood detection
- **Pattern Recognition**: Behavioral trend analysis
- **Personalized Insights**: Custom recommendations
- **Risk Assessment**: Early warning indicators

---

## 🛠️ Development

### Code Style
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality
- **Conventional Commits**: Standardized commit messages

### Git Workflow
1. Create feature branch from `main`
2. Make changes with proper testing
3. Create pull request with description
4. Code review and approval
5. Merge to main branch

### Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core mood tracking functionality
- ✅ AI sentiment analysis
- ✅ Patient and admin dashboards
- ✅ Basic chatbot integration

### Phase 2 (Q2 2024)
- 🔄 Mobile app development
- 🔄 Advanced AI insights
- 🔄 Team collaboration features
- 🔄 Integration with health devices

### Phase 3 (Q3 2024)
- 📅 Telehealth integration
- 📅 Advanced analytics
- 📅 Multi-language support
- 📅 Enterprise features

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hugging Face** - For the amazing transformers library
- **Supabase** - For the excellent backend-as-a-service
- **Vercel** - For seamless frontend deployment
- **ShadCN** - For beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations

---

## 📞 Support

- **Documentation**: [Full Documentation](https://your-docs-url.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/moodmate-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/moodmate-ai/discussions)
- **Email**: support@moodmate-ai.com

---

<div align="center">

**Built with ❤️ for mental wellness and privacy**

[⭐ Star this repo](https://github.com/your-username/moodmate-ai) • [🐛 Report Bug](https://github.com/your-username/moodmate-ai/issues) • [✨ Request Feature](https://github.com/your-username/moodmate-ai/issues)

</div>