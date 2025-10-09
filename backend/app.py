from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from supabase import create_client, Client
from dotenv import load_dotenv
import os

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

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "MoodMate AI Backend is running"})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
