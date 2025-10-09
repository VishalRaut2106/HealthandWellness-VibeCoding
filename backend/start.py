#!/usr/bin/env python3
"""
MoodMate AI Backend Startup Script
"""

import os
import sys
from app import app

if __name__ == "__main__":
    # Check if .env file exists
    if not os.path.exists(".env"):
        print("❌ .env file not found!")
        print("Please create a .env file with your Supabase credentials.")
        print("See env.example for reference.")
        sys.exit(1)
    
    # Check environment variables
    required_vars = ["SUPABASE_URL", "SUPABASE_KEY"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        print(f"❌ Missing environment variables: {', '.join(missing_vars)}")
        print("Please check your .env file.")
        sys.exit(1)
    
    print("🚀 Starting MoodMate AI Backend...")
    print("✅ Environment variables loaded")
    print("🧠 Loading AI model (this may take a moment)...")
    
    # Start the Flask app
    port = int(os.getenv("PORT", 5000))
    print(f"🌐 Server starting on http://localhost:{port}")
    print("📊 Health check: http://localhost:5000/health")
    
    app.run(host="0.0.0.0", port=port, debug=True)
