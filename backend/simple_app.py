from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from simple_chatbot import chatbot

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    """Simple sentiment analysis without AI model"""
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400
            
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        text = data.get("text", "")
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        # Simple keyword-based sentiment analysis
        positive_words = ['good', 'great', 'happy', 'joy', 'love', 'amazing', 'wonderful', 'excellent', 'fantastic', 'awesome', 'beautiful', 'perfect', 'wonderful', 'delighted', 'pleased', 'content', 'satisfied', 'grateful', 'blessed', 'lucky', 'fortunate']
        negative_words = ['bad', 'terrible', 'awful', 'horrible', 'sad', 'angry', 'frustrated', 'disappointed', 'upset', 'worried', 'anxious', 'stressed', 'depressed', 'miserable', 'unhappy', 'annoyed', 'irritated', 'furious', 'devastated', 'heartbroken']
        
        text_lower = text.lower()
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        if positive_count > negative_count:
            sentiment = "positive"
            score = min(0.9, 0.5 + (positive_count * 0.1))
        elif negative_count > positive_count:
            sentiment = "negative"
            score = min(0.9, 0.5 + (negative_count * 0.1))
        else:
            sentiment = "neutral"
            score = 0.5
        
        return jsonify({
            "sentiment": sentiment,
            "score": round(score, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/save", methods=["POST"])
def save():
    """Save mood log (mock implementation)"""
    try:
        data = request.get_json()
        print(f"Mock save: {data}")
        return jsonify({"status": "saved", "message": "Mock save successful"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat():
    """Chat with the mental health chatbot"""
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400
            
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        user_message = data.get("message", "")
        context = data.get("context", "")
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        # Generate response using the chatbot
        response = chatbot.generate_response(user_message, context)
        
        return jsonify({
            "response": response,
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/tips", methods=["GET"])
def get_tips():
    """Get mental health tips"""
    try:
        tips = chatbot.get_mental_health_tips()
        return jsonify({
            "tips": tips,
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/emergency", methods=["GET"])
def get_emergency_resources():
    """Get emergency mental health resources"""
    try:
        resources = chatbot.get_emergency_resources()
        return jsonify({
            "resources": resources,
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "MoodMate AI Backend is running"})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"🚀 Starting MoodMate AI Backend on port {port}")
    print("📊 Health check: http://localhost:5000/health")
    print("🤖 Chatbot: http://localhost:5000/chat")
    app.run(host="0.0.0.0", port=port, debug=True)
