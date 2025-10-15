'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Chatbot } from './chatbot'
import { MessageCircle, X, Heart, Sparkles } from 'lucide-react'

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Chatbot Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4
          }}
          className="relative"
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-calm-500 to-calm-600 hover:from-calm-600 hover:to-calm-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {isOpen ? <X className="w-7 h-7 group-hover:scale-110 transition-transform" /> : <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />}
          </Button>
          
          {/* Floating hearts animation */}
          {!isOpen && (
            <motion.div
              animate={{
                y: [0, -8, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5
              }}
              className="absolute -top-2 -right-2"
            >
              <Heart className="w-4 h-4 text-rose-400" />
            </motion.div>
          )}
          
          {/* Sparkle animation */}
          {!isOpen && (
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 6
              }}
              className="absolute -top-1 -left-1"
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Chatbot */}
      <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
