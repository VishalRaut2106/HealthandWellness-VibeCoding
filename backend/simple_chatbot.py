"""
Simple Mental Health Chatbot using rule-based responses
This is a lightweight alternative to the heavy Llama 2 model
"""

import random
import re

class SimpleMentalHealthChatbot:
    def __init__(self):
        self.responses = {
            'greeting': [
                "Hello! I'm here to listen and support you. How are you feeling today?",
                "Hi there! I'm your mental health companion. What's on your mind?",
                "Welcome! I'm here to help you with your mental wellness journey. How can I support you today?"
            ],
            'positive': [
                "That's wonderful to hear! It's great that you're feeling positive. What's contributing to your good mood?",
                "I'm so glad you're feeling good! Celebrating positive moments is important for mental health.",
                "That's fantastic! Positive feelings are worth acknowledging and savoring."
            ],
            'negative': [
                "I'm sorry you're going through a tough time. It's okay to feel this way. You're not alone.",
                "I hear that you're struggling right now. That takes courage to share. What's been most challenging?",
                "Thank you for sharing that with me. It's important to acknowledge difficult feelings. What would help you feel supported?"
            ],
            'anxiety': [
                "Anxiety can feel overwhelming, but you're taking a positive step by talking about it. What's been triggering your anxiety?",
                "I understand anxiety can be really difficult. Have you tried any breathing exercises or grounding techniques?",
                "Anxiety is a common experience, and you're not alone. What coping strategies have worked for you in the past?"
            ],
            'depression': [
                "I'm sorry you're experiencing depression. It's a real and valid struggle. You're taking an important step by reaching out.",
                "Depression can feel isolating, but you're not alone in this. What support systems do you have in place?",
                "Thank you for sharing that with me. Depression is challenging, and it's okay to not be okay. What helps you get through difficult days?"
            ],
            'stress': [
                "Stress can really impact our mental health. What's been causing you the most stress lately?",
                "I understand stress can be overwhelming. What activities help you feel more relaxed?",
                "Stress is a normal part of life, but it's important to manage it. What coping strategies work best for you?"
            ],
            'crisis': [
                "I'm concerned about your safety. If you're having thoughts of self-harm, please reach out to a mental health professional or emergency services immediately.",
                "Your safety is the most important thing. Please contact a crisis helpline or emergency services if you're in immediate danger.",
                "If you're in crisis, please call your local emergency number or a mental health crisis line. You deserve support and care."
            ],
            'support': [
                "You're taking an important step by seeking support. That shows strength and self-awareness.",
                "It's brave of you to reach out. Remember, seeking help is a sign of strength, not weakness.",
                "You're not alone in this. Many people struggle with mental health, and there's no shame in asking for help."
            ],
            'default': [
                "I'm here to listen. Can you tell me more about what you're experiencing?",
                "Thank you for sharing that with me. How can I best support you right now?",
                "I'm listening. What would be most helpful for you to talk about?"
            ]
        }
        
        self.tips = [
            "Take deep breaths and focus on the present moment",
            "Practice gratitude by writing down three things you're thankful for",
            "Connect with a friend or family member",
            "Engage in physical activity, even a short walk",
            "Try mindfulness or meditation for a few minutes",
            "Listen to calming music or nature sounds",
            "Write in a journal about your feelings",
            "Practice self-compassion and be kind to yourself",
            "Get adequate sleep and maintain a regular sleep schedule",
            "Eat nutritious meals and stay hydrated",
            "Limit exposure to negative news or social media",
            "Spend time in nature if possible",
            "Engage in activities you enjoy",
            "Practice relaxation techniques like progressive muscle relaxation"
        ]
    
    def generate_response(self, user_input, context=""):
        """Generate a response based on user input"""
        user_input_lower = user_input.lower()
        
        # Check for crisis keywords
        crisis_keywords = ['suicide', 'kill myself', 'end it all', 'not worth living', 'want to die']
        if any(keyword in user_input_lower for keyword in crisis_keywords):
            return random.choice(self.responses['crisis'])
        
        # Check for greeting
        greeting_keywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening']
        if any(keyword in user_input_lower for keyword in greeting_keywords):
            return random.choice(self.responses['greeting'])
        
        # Check for positive emotions
        positive_keywords = ['good', 'great', 'happy', 'excited', 'wonderful', 'amazing', 'fantastic', 'joyful', 'content']
        if any(keyword in user_input_lower for keyword in positive_keywords):
            return random.choice(self.responses['positive'])
        
        # Check for negative emotions
        negative_keywords = ['bad', 'terrible', 'awful', 'horrible', 'sad', 'depressed', 'miserable', 'hopeless']
        if any(keyword in user_input_lower for keyword in negative_keywords):
            return random.choice(self.responses['negative'])
        
        # Check for anxiety
        anxiety_keywords = ['anxious', 'anxiety', 'worried', 'nervous', 'panic', 'overwhelmed', 'stressed']
        if any(keyword in user_input_lower for keyword in anxiety_keywords):
            return random.choice(self.responses['anxiety'])
        
        # Check for depression
        depression_keywords = ['depressed', 'depression', 'down', 'low', 'empty', 'numb', 'worthless']
        if any(keyword in user_input_lower for keyword in depression_keywords):
            return random.choice(self.responses['depression'])
        
        # Check for stress
        stress_keywords = ['stress', 'stressed', 'pressure', 'overwhelmed', 'burnout', 'exhausted']
        if any(keyword in user_input_lower for keyword in stress_keywords):
            return random.choice(self.responses['stress'])
        
        # Check for support seeking
        support_keywords = ['help', 'support', 'advice', 'guidance', 'counseling', 'therapy']
        if any(keyword in user_input_lower for keyword in support_keywords):
            return random.choice(self.responses['support'])
        
        # Default response
        return random.choice(self.responses['default'])
    
    def get_mental_health_tips(self):
        """Get mental health tips"""
        return random.sample(self.tips, 5)  # Return 5 random tips
    
    def get_emergency_resources(self):
        """Get emergency mental health resources"""
        return {
            "crisis_helpline": "988 (Suicide & Crisis Lifeline)",
            "text_line": "Text HOME to 741741 (Crisis Text Line)",
            "emergency": "911 (Emergency Services)",
            "message": "If you're in immediate danger, please call emergency services or go to your nearest emergency room."
        }

# Global chatbot instance
chatbot = SimpleMentalHealthChatbot()
