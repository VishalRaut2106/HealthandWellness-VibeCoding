'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, TrendingUp, Calendar, Clock, Heart, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface MoodData {
  date: string
  sentiment: string
  score: number
  text: string
}

interface AIInsightsProps {
  data: MoodData[]
}

export function AIInsights({ data }: AIInsightsProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
          <p className="text-muted-foreground">
            Start logging your moods to get personalized insights!
          </p>
        </CardContent>
      </Card>
    )
  }

  // Analyze patterns
  const analyzePatterns = () => {
    const positiveDays = data.filter(item => item.sentiment === 'positive').length
    const negativeDays = data.filter(item => item.sentiment === 'negative').length
    const neutralDays = data.filter(item => item.sentiment === 'neutral').length
    
    const totalDays = data.length
    const positivePercentage = Math.round((positiveDays / totalDays) * 100)
    
    // Find best and worst days
    const bestDay = data.reduce((best, current) => 
      current.score > best.score ? current : best
    )
    const worstDay = data.reduce((worst, current) => 
      current.score < worst.score ? current : worst
    )

    // Calculate average score
    const averageScore = data.reduce((sum, item) => sum + item.score, 0) / totalDays

    // Find patterns by day of week
    const dayPatterns = data.reduce((acc, item) => {
      const day = new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' })
      if (!acc[day]) acc[day] = { total: 0, count: 0 }
      acc[day].total += item.score
      acc[day].count += 1
      return acc
    }, {} as Record<string, { total: number; count: number }>)

    const bestDayOfWeek = Object.entries(dayPatterns)
      .map(([day, data]) => ({ day, avg: data.total / data.count }))
      .sort((a, b) => b.avg - a.avg)[0]

    return {
      positivePercentage,
      averageScore,
      bestDay,
      worstDay,
      bestDayOfWeek,
      totalDays,
      positiveDays,
      negativeDays,
      neutralDays
    }
  }

  const insights = analyzePatterns()

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

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="w-5 h-5" />
      case 'pattern':
        return <Calendar className="w-5 h-5" />
      case 'time':
        return <Clock className="w-5 h-5" />
      case 'emotion':
        return <Heart className="w-5 h-5" />
      default:
        return <Brain className="w-5 h-5" />
    }
  }

  const insightsList = [
    {
      type: 'trend',
      title: 'Overall Mood Trend',
      description: `You've been feeling positive ${insights.positivePercentage}% of the time over the last ${insights.totalDays} days.`,
      color: insights.positivePercentage > 60 ? 'text-green-600' : insights.positivePercentage > 40 ? 'text-yellow-600' : 'text-red-600'
    },
    {
      type: 'pattern',
      title: 'Best Day of the Week',
      description: `You tend to feel best on ${insights.bestDayOfWeek?.day}s with an average confidence of ${Math.round((insights.bestDayOfWeek?.avg || 0) * 100)}%.`,
      color: 'text-blue-600'
    },
    {
      type: 'emotion',
      title: 'Your Best Day',
      description: `Your happiest day was ${new Date(insights.bestDay.date).toLocaleDateString()} when you felt ${insights.bestDay.sentiment} (${Math.round(insights.bestDay.score * 100)}% confidence).`,
      color: 'text-green-600'
    },
    {
      type: 'time',
      title: 'Mood Distribution',
      description: `${insights.positiveDays} positive days, ${insights.negativeDays} challenging days, and ${insights.neutralDays} neutral days.`,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-calm-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Personalized analysis of your emotional patterns and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insightsList.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${insight.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Mood Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Confidence</span>
                <span className="font-semibold">{Math.round(insights.averageScore * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Entries</span>
                <span className="font-semibold">{insights.totalDays}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Positive Days</span>
                <span className="font-semibold text-green-600">{insights.positiveDays}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Challenging Days</span>
                <span className="font-semibold text-red-600">{insights.negativeDays}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              Recent Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm font-medium text-green-800">Best Day</p>
                <p className="text-xs text-green-600">
                  {new Date(insights.bestDay.date).toLocaleDateString()} - {Math.round(insights.bestDay.score * 100)}% confidence
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm font-medium text-blue-800">Best Day of Week</p>
                <p className="text-xs text-blue-600">
                  {insights.bestDayOfWeek?.day}s - {Math.round((insights.bestDayOfWeek?.avg || 0) * 100)}% average
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
