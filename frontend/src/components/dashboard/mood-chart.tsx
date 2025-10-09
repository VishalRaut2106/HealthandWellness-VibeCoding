'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MoodData {
  date: string
  sentiment: string
  score: number
  text: string
}

interface MoodChartProps {
  data: MoodData[]
}

export function MoodChart({ data }: MoodChartProps) {
  // Process data for the chart
  const chartData = data.map((item, index) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: item.score,
    sentiment: item.sentiment,
    index: index + 1
  }))

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '#22c55e'
      case 'negative':
        return '#ef4444'
      default:
        return '#eab308'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-yellow-500" />
    }
  }

  const averageScore = data.length > 0 ? data.reduce((sum, item) => sum + item.score, 0) / data.length : 0
  const positiveDays = data.filter(item => item.sentiment === 'positive').length
  const totalDays = data.length

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-calm-50 to-mint/20 border-calm-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-calm-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Average Score</p>
                <p className="text-3xl font-bold text-calm-700">
                  {Math.round(averageScore * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald/20 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Positive Days</p>
                <p className="text-3xl font-bold text-green-600">
                  {positiveDays}/{totalDays}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-sky/20 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <Minus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Entries</p>
                <p className="text-3xl font-bold text-blue-600">{totalDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mood Trend Chart */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-calm-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Mood Trends</CardTitle>
          </div>
          <CardDescription className="text-lg text-gray-600">
            Your emotional journey over the last {data.length} days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 1]} />
                <Tooltip
                  formatter={(value: number) => [`${Math.round(value * 100)}%`, 'Confidence']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No mood data yet</p>
                <p className="text-sm">Start logging your moods to see trends!</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Your latest mood logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                >
                  {getSentimentIcon(item.sentiment)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.text}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
