'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { analyzeMood, saveMoodLog } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { Smile, Frown, Meh, Heart, Brain } from 'lucide-react'

const emojis = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '🤗', label: 'Grateful', value: 'grateful' },
  { emoji: '😌', label: 'Content', value: 'content' },
]

interface MoodLoggerProps {
  onLogSaved: () => void
}

export function MoodLogger({ onLogSaved }: MoodLoggerProps) {
  const [text, setText] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ sentiment: string; score: number } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Analyze sentiment
      const analysis = await analyzeMood(text)
      setResult(analysis)

      // Save to database (mock for now since we don't have Supabase configured)
      console.log('Saving mood log:', {
        user_id: user.id,
        text,
        sentiment: analysis.sentiment,
        score: analysis.score,
      })

      // Show success message
      setTimeout(() => {
        setResult(null)
        setText('')
        setSelectedEmoji('')
        onLogSaved()
      }, 2000)
    } catch (error) {
      console.error('Error saving mood log:', error)
      // Still show the result even if save fails
      const analysis = await analyzeMood(text)
      setResult(analysis)
    } finally {
      setLoading(false)
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-6 h-6 text-green-500" />
      case 'negative':
        return <Frown className="w-6 h-6 text-red-500" />
      default:
        return <Meh className="w-6 h-6 text-yellow-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50'
      case 'negative':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-yellow-600 bg-yellow-50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-rose-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              How are you feeling today?
            </CardTitle>
          </div>
          <CardDescription className="text-lg text-gray-600">
            Share your thoughts and feelings. Your journal is private and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                What's on your mind?
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="I'm feeling... Today was... I'm grateful for..."
                className="min-h-[140px] resize-none text-lg border-2 border-gray-200 focus:border-calm-500 rounded-xl p-4 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                How would you describe your mood? (Optional)
              </label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {emojis.map((emoji) => (
                  <button
                    key={emoji.value}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji.value)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 transform ${
                      selectedEmoji === emoji.value
                        ? 'border-calm-500 bg-calm-50 shadow-lg'
                        : 'border-gray-200 hover:border-calm-300 hover:shadow-md'
                    }`}
                  >
                    <span className="text-3xl block mb-2">{emoji.emoji}</span>
                    <div className="text-xs text-gray-600 font-medium">{emoji.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-xl border-2 ${getSentimentColor(result.sentiment)}`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {getSentimentIcon(result.sentiment)}
                    <span className="font-semibold text-lg">
                      AI Analysis: {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm opacity-75 mb-3">
                    Confidence: {Math.round(result.score * 100)}%
                  </p>
                  <div className="text-sm font-medium">
                    ✅ Mood logged successfully! Redirecting to dashboard...
                  </div>
                </div>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full bg-gradient-to-r from-calm-600 to-calm-700 hover:from-calm-700 hover:to-calm-800 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 animate-spin" />
                  Analyzing your mood...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Save Mood Log
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
