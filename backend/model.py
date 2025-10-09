"""
Mood analysis models and utilities
"""

from transformers import pipeline
import torch

class MoodAnalyzer:
    """Wrapper class for sentiment analysis model"""
    
    def __init__(self):
        self.model_name = "distilbert-base-uncased-finetuned-sst-2-english"
        self.pipeline = None
        self._load_model()
    
    def _load_model(self):
        """Load the sentiment analysis model"""
        try:
            self.pipeline = pipeline(
                "sentiment-analysis", 
                model=self.model_name,
                device=0 if torch.cuda.is_available() else -1
            )
            print(f"Model loaded successfully on {'GPU' if torch.cuda.is_available() else 'CPU'}")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise e
    
    def analyze(self, text: str):
        """
        Analyze sentiment of text
        
        Args:
            text (str): Text to analyze
            
        Returns:
            dict: Analysis results with sentiment and confidence score
        """
        if not self.pipeline:
            raise RuntimeError("Model not loaded")
        
        try:
            result = self.pipeline(text)[0]
            return {
                "sentiment": result["label"].lower(),
                "score": round(result["score"], 2)
            }
        except Exception as e:
            print(f"Error analyzing text: {e}")
            raise e

# Global analyzer instance
mood_analyzer = MoodAnalyzer()
