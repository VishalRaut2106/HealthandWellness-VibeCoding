"""
Mental Health Chatbot using Hugging Face Llama 2
"""

from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import re

class MentalHealthChatbot:
    def __init__(self):
        self.model_name = "meta-llama/Llama-2-7b-chat-hf"
        self.tokenizer = None
        self.model = None
        self._load_model()
        
    def _load_model(self):
        """Load the Llama 2 model and tokenizer"""
        try:
            print("Loading Llama 2 model... This may take a few minutes.")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_name,
                torch_dtype=torch.float16,
                device_map="auto",
                low_cpu_mem_usage=True
            )
            print("Model loaded successfully!")
        except Exception as e:
            print(f"Error loading model: {e}")
            # Fallback to a smaller model if Llama 2 fails
            self._load_fallback_model()
    
    def _load_fallback_model(self):
        """Load a smaller fallback model"""
        try:
            print("Loading fallback model...")
            self.model_name = "microsoft/DialoGPT-medium"
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForCausalLM.from_pretrained(self.model_name)
            print("Fallback model loaded successfully!")
        except Exception as e:
            print(f"Error loading fallback model: {e}")
            self.model = None
            self.tokenizer = None
    
    def generate_response(self, user_input, context=""):
        """Generate a response to user input"""
        if not self.model or not self.tokenizer:
            return "I'm sorry, I'm having trouble connecting right now. Please try again later."
        
        try:
            # Create a mental health focused prompt
            system_prompt = """You are a compassionate mental health support chatbot. You provide:
            - Empathetic and supportive responses
            - Gentle encouragement
            - Mental health resources and coping strategies
            - Crisis intervention guidance when needed
            - Professional boundaries (not a replacement for therapy)
            
            Keep responses concise, warm, and helpful. If someone mentions self-harm or suicide, 
            encourage them to contact emergency services or a mental health professional immediately."""
            
            # Format the conversation
            if context:
                prompt = f"{system_prompt}\n\nContext: {context}\n\nUser: {user_input}\n\nAssistant:"
            else:
                prompt = f"{system_prompt}\n\nUser: {user_input}\n\nAssistant:"
            
            # Tokenize input
            inputs = self.tokenizer.encode(prompt, return_tensors="pt")
            
            # Generate response
            with torch.no_grad():
                outputs = self.model.generate(
                    inputs,
                    max_length=inputs.shape[1] + 150,
                    num_return_sequences=1,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id,
                    eos_token_id=self.tokenizer.eos_token_id,
                    top_p=0.9,
                    top_k=50
                )
            
            # Decode response
            response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            
            # Extract just the assistant's response
            if "Assistant:" in response:
                response = response.split("Assistant:")[-1].strip()
            
            # Clean up the response
            response = self._clean_response(response)
            
            return response
            
        except Exception as e:
            print(f"Error generating response: {e}")
            return "I'm here to listen and support you. Could you tell me more about how you're feeling?"
    
    def _clean_response(self, response):
        """Clean up the generated response"""
        # Remove any remaining prompt text
        response = re.sub(r'^.*?Assistant:', '', response, flags=re.DOTALL)
        
        # Remove any user input that might have been included
        response = re.sub(r'User:.*$', '', response, flags=re.DOTALL)
        
        # Clean up whitespace
        response = response.strip()
        
        # Ensure response is not too long
        if len(response) > 500:
            response = response[:500] + "..."
        
        return response
    
    def get_mental_health_tips(self):
        """Get some mental health tips"""
        tips = [
            "Take deep breaths and focus on the present moment",
            "Practice gratitude by writing down three things you're thankful for",
            "Connect with a friend or family member",
            "Engage in physical activity, even a short walk",
            "Try mindfulness or meditation for a few minutes",
            "Listen to calming music or nature sounds",
            "Write in a journal about your feelings",
            "Practice self-compassion and be kind to yourself"
        ]
        return tips

# Global chatbot instance
chatbot = MentalHealthChatbot()
