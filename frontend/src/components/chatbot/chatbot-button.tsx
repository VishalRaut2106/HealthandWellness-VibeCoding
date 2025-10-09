'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Chatbot } from './chatbot'
import { MessageCircle, X } from 'lucide-react'

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Chatbot Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-calm-600 to-calm-700 hover:from-calm-700 hover:to-calm-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Chatbot */}
      {isOpen && (
        <Chatbot onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}
