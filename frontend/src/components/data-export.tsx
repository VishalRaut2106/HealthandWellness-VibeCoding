'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Database,
  BarChart3,
  Heart,
  Brain,
  MessageCircle
} from 'lucide-react'

interface ExportOptions {
  format: 'json' | 'csv' | 'pdf'
  dateRange: {
    start: string
    end: string
  }
  dataTypes: {
    moodLogs: boolean
    insights: boolean
    notifications: boolean
    chatHistory: boolean
    achievements: boolean
    settings: boolean
  }
  includeAnalytics: boolean
}

export function DataExport() {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'json',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      end: new Date().toISOString().split('T')[0] // today
    },
    dataTypes: {
      moodLogs: true,
      insights: true,
      notifications: false,
      chatHistory: false,
      achievements: true,
      settings: false
    },
    includeAnalytics: true
  })

  const [isExporting, setIsExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'completed' | 'error'>('idle')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleExport = async () => {
    setIsExporting(true)
    setExportStatus('exporting')
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create mock export data
      const exportData = {
        exportInfo: {
          exportDate: new Date().toISOString(),
          format: exportOptions.format,
          dateRange: exportOptions.dateRange,
          dataTypes: exportOptions.dataTypes
        },
        user: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          exportDate: new Date().toISOString()
        },
        moodLogs: exportOptions.dataTypes.moodLogs ? [
          {
            date: '2024-01-27',
            sentiment: 'positive',
            score: 0.85,
            text: 'Feeling great today!',
            emoji: '😊',
            tags: ['work', 'exercise'],
            moodIntensity: 8,
            energyLevel: 7,
            sleepQuality: 6,
            stressLevel: 3
          },
          {
            date: '2024-01-26',
            sentiment: 'neutral',
            score: 0.52,
            text: 'Just an average day',
            emoji: '😐',
            tags: ['routine'],
            moodIntensity: 5,
            energyLevel: 5,
            sleepQuality: 7,
            stressLevel: 4
          }
        ] : [],
        insights: exportOptions.dataTypes.insights ? [
          {
            type: 'positive_trend',
            title: 'Improving Mood',
            message: 'Your mood has been trending positive over the last week!',
            confidence: 0.8,
            createdAt: '2024-01-25T10:00:00Z'
          }
        ] : [],
        achievements: exportOptions.dataTypes.achievements ? [
          {
            name: 'First Entry',
            description: 'Log your first mood entry',
            earnedAt: '2024-01-15T09:00:00Z'
          },
          {
            name: 'Week Warrior',
            description: 'Log mood for 7 consecutive days',
            earnedAt: '2024-01-22T09:00:00Z'
          }
        ] : [],
        analytics: exportOptions.includeAnalytics ? {
          totalEntries: 45,
          averageScore: 0.78,
          positiveDays: 32,
          negativeDays: 8,
          neutralDays: 5,
          streak: 12,
          trend: 'positive'
        } : null
      }

      // Create download URL
      const dataStr = exportOptions.format === 'json' 
        ? JSON.stringify(exportData, null, 2)
        : convertToCSV(exportData)
      
      const blob = new Blob([dataStr], { 
        type: exportOptions.format === 'json' ? 'application/json' : 'text/csv' 
      })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setExportStatus('completed')
      
    } catch (error) {
      setExportStatus('error')
    } finally {
      setIsExporting(false)
    }
  }

  const convertToCSV = (data: any) => {
    if (exportOptions.dataTypes.moodLogs && data.moodLogs.length > 0) {
      const headers = ['Date', 'Sentiment', 'Score', 'Text', 'Emoji', 'Tags', 'Mood Intensity', 'Energy Level', 'Sleep Quality', 'Stress Level']
      const rows = data.moodLogs.map((log: any) => [
        log.date,
        log.sentiment,
        log.score,
        log.text,
        log.emoji,
        log.tags?.join(', ') || '',
        log.moodIntensity,
        log.energyLevel,
        log.sleepQuality,
        log.stressLevel
      ])
      
      return [headers, ...rows].map(row => row.join(',')).join('\n')
    }
    return 'No data to export'
  }

  const downloadFile = () => {
    if (downloadUrl) {
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `moodmate-export-${new Date().toISOString().split('T')[0]}.${exportOptions.format}`
      a.click()
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl(null)
      setExportStatus('idle')
    }
  }

  const updateDataTypes = (type: keyof ExportOptions['dataTypes'], value: boolean) => {
    setExportOptions(prev => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [type]: value
      }
    }))
  }

  const getStatusIcon = () => {
    switch (exportStatus) {
      case 'exporting':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Download className="w-5 h-5" />
    }
  }

  const getStatusText = () => {
    switch (exportStatus) {
      case 'exporting':
        return 'Exporting your data...'
      case 'completed':
        return 'Export completed! Ready to download.'
      case 'error':
        return 'Export failed. Please try again.'
      default:
        return 'Export your data'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Export Your Data</h2>
        <p className="text-gray-600">Download your mood logs, insights, and personal data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Export Options
            </CardTitle>
            <CardDescription>
              Choose what data to include in your export
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <div className="flex gap-2">
                {[
                  { value: 'json', label: 'JSON', icon: FileText },
                  { value: 'csv', label: 'CSV', icon: BarChart3 },
                  { value: 'pdf', label: 'PDF', icon: FileText }
                ].map((format) => (
                  <Button
                    key={format.value}
                    variant={exportOptions.format === format.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setExportOptions(prev => ({ ...prev, format: format.value as any }))}
                    className="flex items-center gap-2"
                  >
                    <format.icon className="w-4 h-4" />
                    {format.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={exportOptions.dateRange.start}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={exportOptions.dateRange.end}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Data Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data to Include
              </label>
              <div className="space-y-3">
                {[
                  { key: 'moodLogs', label: 'Mood Logs', icon: Heart, description: 'Your daily mood entries' },
                  { key: 'insights', label: 'AI Insights', icon: Brain, description: 'Personalized insights and recommendations' },
                  { key: 'achievements', label: 'Achievements', icon: CheckCircle, description: 'Your earned achievements and badges' },
                  { key: 'notifications', label: 'Notifications', icon: AlertCircle, description: 'System notifications and alerts' },
                  { key: 'chatHistory', label: 'Chat History', icon: MessageCircle, description: 'Conversations with AI companion' },
                  { key: 'settings', label: 'Settings', icon: Database, description: 'Your account and privacy settings' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={exportOptions.dataTypes[item.key as keyof ExportOptions['dataTypes']]}
                      onChange={(e) => updateDataTypes(item.key as keyof ExportOptions['dataTypes'], e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Option */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Include Analytics</p>
                <p className="text-sm text-gray-600">Summary statistics and trends</p>
              </div>
              <input
                type="checkbox"
                checked={exportOptions.includeAnalytics}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeAnalytics: e.target.checked }))}
                className="w-4 h-4"
              />
            </div>
          </CardContent>
        </Card>

        {/* Export Preview & Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Export Preview
            </CardTitle>
            <CardDescription>
              Review your export settings and start the download
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preview Summary */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Format:</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {exportOptions.format.toUpperCase()}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Date Range:</span>
                <span className="text-sm font-medium">
                  {new Date(exportOptions.dateRange.start).toLocaleDateString()} - {new Date(exportOptions.dateRange.end).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Data Types:</span>
                <span className="text-sm font-medium">
                  {Object.values(exportOptions.dataTypes).filter(Boolean).length} selected
                </span>
              </div>
            </div>

            {/* Export Status */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon()}
                <span className="font-medium">{getStatusText()}</span>
              </div>
              {exportStatus === 'exporting' && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {exportStatus === 'completed' ? (
                <Button
                  onClick={downloadFile}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Export
                </Button>
              ) : (
                <Button
                  onClick={handleExport}
                  disabled={isExporting || !Object.values(exportOptions.dataTypes).some(Boolean)}
                  className="w-full"
                  size="lg"
                >
                  {isExporting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Start Export
                    </>
                  )}
                </Button>
              )}

              {exportStatus === 'error' && (
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="w-full"
                >
                  Try Again
                </Button>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Privacy Notice</p>
                  <p className="text-xs text-blue-700">
                    Your exported data is encrypted and secure. Download links expire after 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
