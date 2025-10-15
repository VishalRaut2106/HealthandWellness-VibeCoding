'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Heart, 
  Brain, 
  Lightbulb,
  Calendar,
  TrendingUp,
  Shield,
  Sparkles,
  Wind,
  Eye,
  Phone,
  BookOpen
} from 'lucide-react'
import { BreathingExercise } from './breathing-exercise'
import { GroundingExercise } from './grounding-exercise'
import { MentalHealthResources } from './mental-health-resources'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'suggestion' | 'resource'
  suggestions?: string[]
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your mental health companion. I'm here to help you with mood tracking, provide support, and offer guidance. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      suggestions: [
        "I'm feeling anxious",
        "I need help with stress",
        "I want to track my mood",
        "I'm having a tough day"
      ]
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showBreathing, setShowBreathing] = useState(false)
  const [showGrounding, setShowGrounding] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getBotResponse = (userMessage: string): { text: string; suggestions?: string[]; type?: string } => {
    const message = userMessage.toLowerCase()
    
    // Mood-related responses
    if (message.includes('anxious') || message.includes('anxiety')) {
      return {
        text: "I understand you're feeling anxious. That's completely normal. Here are some techniques that might help:\n\n• Take 5 deep breaths slowly\n• Try the 5-4-3-2-1 grounding technique\n• Practice progressive muscle relaxation\n• Remember: this feeling will pass",
        suggestions: ["Tell me more about your anxiety", "I need breathing exercises", "What's the 5-4-3-2-1 technique?"],
        type: 'resource'
      }
    }

    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      return {
        text: "I'm sorry you're feeling down. It's okay to have these feelings. Here are some gentle suggestions:\n\n• Reach out to someone you trust\n• Try a small, enjoyable activity\n• Practice self-compassion\n• Consider professional help if needed",
        suggestions: ["I need someone to talk to", "What activities might help?", "How do I practice self-compassion?"],
        type: 'resource'
      }
    }

    if (message.includes('stressed') || message.includes('stress')) {
      return {
        text: "Stress can be overwhelming. Let's work through this together:\n\n• Identify what's causing your stress\n• Break tasks into smaller steps\n• Practice mindfulness or meditation\n• Take regular breaks",
        suggestions: ["Help me identify stress sources", "Teach me mindfulness", "I need stress management tips"],
        type: 'resource'
      }
    }

    if (message.includes('happy') || message.includes('good') || message.includes('great')) {
      return {
        text: "That's wonderful to hear! 😊 It's great that you're feeling positive. Consider:\n\n• What contributed to this good feeling?\n• How can you build on this positive energy?\n• Remember this feeling for difficult times",
        suggestions: ["How do I maintain this feeling?", "I want to track this positive mood", "What made me feel good?"],
        type: 'suggestion'
      }
    }

    // Mood tracking
    if (message.includes('track') || message.includes('mood') || message.includes('log')) {
      return {
        text: "Great! Mood tracking is an excellent way to understand your patterns. You can:\n\n• Log your daily mood in the app\n• Note what triggers different emotions\n• Track patterns over time\n• Share insights with your healthcare provider",
        suggestions: ["How do I log my mood?", "What should I track?", "How do I see my patterns?"],
        type: 'suggestion'
      }
    }

    // Breathing exercises
    if (message.includes('breathing') || message.includes('breathe')) {
      return {
        text: "Let's do a breathing exercise together! 🌬️\n\nI can guide you through a calming breathing exercise that helps reduce stress and anxiety. Would you like to start?",
        suggestions: ["Start breathing exercise", "Tell me about breathing techniques", "I need other help"],
        type: 'resource'
      }
    }

    // Grounding techniques
    if (message.includes('grounding') || message.includes('5-4-3-2-1')) {
      return {
        text: "**5-4-3-2-1 Grounding Technique:** 🌍\n\n• **5** things you can see\n• **4** things you can touch\n• **3** things you can hear\n• **2** things you can smell\n• **1** thing you can taste\n\nThis helps bring you back to the present moment.",
        suggestions: ["Let's do this together", "I need other grounding techniques", "This helped, thank you"],
        type: 'resource'
      }
    }

    // Self-care
    if (message.includes('self-care') || message.includes('self care')) {
      return {
        text: "Self-care is so important! Here are some ideas:\n\n• Take a warm bath or shower\n• Go for a gentle walk\n• Listen to your favorite music\n• Practice gratitude\n• Get enough sleep\n• Eat nourishing foods",
        suggestions: ["More self-care ideas", "How do I start a routine?", "I don't have time for self-care"],
        type: 'resource'
      }
    }

    // Crisis support
    if (message.includes('crisis') || message.includes('emergency') || message.includes('suicide') || message.includes('hurt myself')) {
      return {
        text: "I'm concerned about you. If you're having thoughts of hurting yourself, please reach out for immediate help:\n\n• **Crisis Text Line**: Text HOME to 741741\n• **National Suicide Prevention Lifeline**: 988\n• **Emergency Services**: 911\n\nYou're not alone, and help is available.",
        suggestions: ["I need immediate help", "I'm not sure if I'm in crisis", "Thank you for caring"],
        type: 'resource'
      }
    }

    // General support
    if (message.includes('help') || message.includes('support')) {
      return {
        text: "I'm here to support you! I can help with:\n\n• Mood tracking and insights\n• Breathing and relaxation exercises\n• Stress management techniques\n• Self-care suggestions\n• Crisis resources\n\nWhat would be most helpful right now?",
        suggestions: ["Mood tracking help", "Relaxation techniques", "Self-care ideas", "Crisis resources"],
        type: 'suggestion'
      }
    }

    // Default response
    return {
      text: "I'm here to listen and support you. I can help with mood tracking, stress management, breathing exercises, and general mental health guidance. What's on your mind?",
      suggestions: [
        "I need help with anxiety",
        "I want to track my mood",
        "I need breathing exercises",
        "I'm feeling overwhelmed"
      ],
      type: 'text'
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type as any,
        suggestions: botResponse.suggestions
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-calm-500 to-calm-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Mental Health Companion</h3>
            <p className="text-xs text-white/80">Always here to support you</p>
          </div>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setShowBreathing(true)}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            <Wind className="w-3 h-3 mr-1" />
            Breathing
          </Button>
          <Button
            onClick={() => setShowGrounding(true)}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            <Eye className="w-3 h-3 mr-1" />
            Grounding
          </Button>
          <Button
            onClick={() => setShowResources(true)}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            <Phone className="w-3 h-3 mr-1" />
            Resources
          </Button>
          <Button
            onClick={() => {
              const message = "I need immediate help"
              setInputText(message)
              handleSendMessage()
            }}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            <Shield className="w-3 h-3 mr-1" />
            Crisis Help
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-calm-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-calm-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                {message.suggestions && (
                  <div className="mt-2 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 rounded-lg px-2 py-1 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-500 focus:border-transparent"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            size="sm"
            className="bg-calm-500 hover:bg-calm-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Exercise Components */}
      {showBreathing && (
        <BreathingExercise onClose={() => setShowBreathing(false)} />
      )}
      
      {showGrounding && (
        <GroundingExercise onClose={() => setShowGrounding(false)} />
      )}
      
      {showResources && (
        <MentalHealthResources onClose={() => setShowResources(false)} />
      )}
    </motion.div>
  )
}