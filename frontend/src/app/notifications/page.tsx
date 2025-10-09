'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Footer } from '@/components/layout/footer'
import { 
  Heart, 
  Bell, 
  Check, 
  X,
  ArrowLeft,
  Settings,
  Filter,
  MarkAsRead,
  Trash2,
  Star,
  TrendingUp,
  MessageCircle,
  Calendar,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'mood_reminder',
      title: 'Time to log your mood!',
      message: 'How are you feeling today? Take a moment to reflect and log your mood.',
      timestamp: '2024-01-27T10:00:00Z',
      read: false,
      priority: 'high',
      icon: <Heart className="w-5 h-5 text-rose-500" />
    },
    {
      id: 2,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'Congratulations! You\'ve logged your mood for 7 consecutive days.',
      timestamp: '2024-01-26T15:30:00Z',
      read: false,
      priority: 'medium',
      icon: <Star className="w-5 h-5 text-yellow-500" />
    },
    {
      id: 3,
      type: 'insight',
      title: 'Weekly Mood Report',
      message: 'Your mood has been trending positive this week. Great job!',
      timestamp: '2024-01-25T09:00:00Z',
      read: true,
      priority: 'low',
      icon: <TrendingUp className="w-5 h-5 text-green-500" />
    },
    {
      id: 4,
      type: 'chat',
      title: 'AI Companion Message',
      message: 'Your mental health companion has some insights to share with you.',
      timestamp: '2024-01-24T14:20:00Z',
      read: true,
      priority: 'medium',
      icon: <MessageCircle className="w-5 h-5 text-blue-500" />
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Weekly Check-in',
      message: 'Don\'t forget to review your weekly progress and set new goals.',
      timestamp: '2024-01-23T11:00:00Z',
      read: true,
      priority: 'low',
      icon: <Calendar className="w-5 h-5 text-purple-500" />
    },
    {
      id: 6,
      type: 'alert',
      title: 'Mental Health Resources',
      message: 'New mental health resources and tips are available in your dashboard.',
      timestamp: '2024-01-22T16:45:00Z',
      read: false,
      priority: 'high',
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />
    }
  ])

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read
    if (filter === 'read') return notification.read
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const deleteSelected = () => {
    setNotifications(prev => 
      prev.filter(notification => !selectedNotifications.includes(notification.id))
    )
    setSelectedNotifications([])
  }

  const toggleSelection = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notificationId => notificationId !== id)
        : [...prev, id]
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/10 via-sky/10 to-rose/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-calm-600" />
              <h1 className="text-xl font-bold text-calm-700">MoodMate AI</h1>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-calm-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notifications
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with your mental health journey
          </p>
        </motion.div>

        {/* Stats and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
                <div className="text-sm text-gray-600">Total Notifications</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{unreadCount}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{notifications.length - unreadCount}</div>
                <div className="text-sm text-gray-600">Read</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread
              </Button>
              <Button
                variant={filter === 'read' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('read')}
              >
                Read
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <MarkAsRead className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={deleteSelected}
                disabled={selectedNotifications.length === 0}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-calm-600" />
                {filter === 'all' ? 'All Notifications' : 
                 filter === 'unread' ? 'Unread Notifications' : 
                 'Read Notifications'}
              </CardTitle>
              <CardDescription>
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        notification.read 
                          ? 'border-gray-200 bg-gray-50' 
                          : 'border-calm-200 bg-calm-50'
                      } ${
                        selectedNotifications.includes(notification.id)
                          ? 'ring-2 ring-calm-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleSelection(notification.id)}
                          className="mt-1"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              notification.read ? 'bg-gray-100' : 'bg-white'
                            }`}>
                              {notification.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className={`font-semibold ${
                                  notification.read ? 'text-gray-600' : 'text-gray-900'
                                }`}>
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-calm-600 rounded-full"></div>
                                )}
                              </div>
                              <p className={`text-sm ${
                                notification.read ? 'text-gray-500' : 'text-gray-700'
                              }`}>
                                {notification.message}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredNotifications.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No notifications found
                    </h3>
                    <p className="text-gray-600">
                      {filter === 'all' 
                        ? 'You don\'t have any notifications yet.'
                        : `You don't have any ${filter} notifications.`
                      }
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-calm-600" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Mood Reminders</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Daily mood reminders</span>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Weekly check-ins</span>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Achievements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Achievement notifications</span>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progress updates</span>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
