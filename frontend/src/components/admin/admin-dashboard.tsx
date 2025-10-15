'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  TrendingUp, 
  Brain, 
  Calendar, 
  Heart, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  Eye,
  UserCheck,
  Search,
  Filter,
  Download,
  Settings,
  Mail,
  Phone,
  MessageCircle,
  Shield,
  Activity,
  Clock,
  Star
} from 'lucide-react'

interface ClientData {
  id: string
  email: string
  name: string
  totalEntries: number
  lastEntry: string
  averageScore: number
  positiveDays: number
  negativeDays: number
  neutralDays: number
  recentMoods: Array<{
    date: string
    sentiment: string
    score: number
    text: string
  }>
  status: 'active' | 'inactive' | 'needs_attention'
}

export function AdminDashboard() {
  const [clients, setClients] = useState<ClientData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'needs_attention' | 'inactive'>('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'analytics' | 'settings'>('overview')

  // Mock data for demonstration
  useEffect(() => {
    const mockClients: ClientData[] = [
      {
        id: '1',
        email: 'john@example.com',
        name: 'John Doe',
        totalEntries: 15,
        lastEntry: '2024-01-15',
        averageScore: 0.75,
        positiveDays: 10,
        negativeDays: 3,
        neutralDays: 2,
        recentMoods: [
          { date: '2024-01-15', sentiment: 'positive', score: 0.85, text: 'Feeling great today!' },
          { date: '2024-01-14', sentiment: 'positive', score: 0.78, text: 'Had a good day at work' },
          { date: '2024-01-13', sentiment: 'neutral', score: 0.52, text: 'Just an average day' }
        ],
        status: 'active'
      },
      {
        id: '2',
        email: 'jane@example.com',
        name: 'Jane Smith',
        totalEntries: 8,
        lastEntry: '2024-01-12',
        averageScore: 0.45,
        positiveDays: 2,
        negativeDays: 5,
        neutralDays: 1,
        recentMoods: [
          { date: '2024-01-12', sentiment: 'negative', score: 0.35, text: 'Feeling overwhelmed' },
          { date: '2024-01-11', sentiment: 'negative', score: 0.42, text: 'Struggling with anxiety' },
          { date: '2024-01-10', sentiment: 'positive', score: 0.68, text: 'Better day today' }
        ],
        status: 'needs_attention'
      },
      {
        id: '3',
        email: 'mike@example.com',
        name: 'Mike Johnson',
        totalEntries: 25,
        lastEntry: '2024-01-15',
        averageScore: 0.82,
        positiveDays: 20,
        negativeDays: 2,
        neutralDays: 3,
        recentMoods: [
          { date: '2024-01-15', sentiment: 'positive', score: 0.88, text: 'Excellent day!' },
          { date: '2024-01-14', sentiment: 'positive', score: 0.85, text: 'Feeling motivated' },
          { date: '2024-01-13', sentiment: 'positive', score: 0.79, text: 'Great progress' }
        ],
        status: 'active'
      }
    ]
    
    setTimeout(() => {
      setClients(mockClients)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'needs_attention':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />
      case 'needs_attention':
        return <AlertCircle className="w-4 h-4" />
      case 'inactive':
        return <UserCheck className="w-4 h-4" />
      default:
        return <UserCheck className="w-4 h-4" />
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

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-calm-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Monitor client progress and mental health insights</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-2"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Search and Filter */}
      {activeTab === 'clients' && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'needs_attention', 'inactive'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status as any)}
              >
                {status.replace('_', ' ')}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-green-600">
                  {clients.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Need Attention</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {clients.filter(c => c.status === 'needs_attention').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-purple-600">
                  {clients.reduce((sum, c) => sum + c.totalEntries, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New client registered', user: 'Sarah Wilson', time: '2 hours ago', type: 'success' },
                  { action: 'Mood alert triggered', user: 'John Doe', time: '4 hours ago', type: 'warning' },
                  { action: 'Weekly report generated', user: 'System', time: '1 day ago', type: 'info' },
                  { action: 'Client completed goal', user: 'Mike Johnson', time: '2 days ago', type: 'success' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'clients' && (
        <>
          {/* Clients List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredClients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card 
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                selectedClient?.id === client.id ? 'ring-2 ring-calm-500' : ''
              }`}
              onClick={() => setSelectedClient(client)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>{client.email}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(client.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(client.status)}
                      {client.status.replace('_', ' ')}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{client.totalEntries}</div>
                    <div className="text-sm text-gray-600">Entries</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">
                      {Math.round(client.averageScore * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Positive: {client.positiveDays}</span>
                    <span className="text-red-600">Negative: {client.negativeDays}</span>
                    <span className="text-yellow-600">Neutral: {client.neutralDays}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Last entry: {new Date(client.lastEntry).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Platform Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                  <div className="text-xs text-green-600">+12% this month</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">8,934</div>
                  <div className="text-sm text-gray-600">Mood Entries</div>
                  <div className="text-xs text-green-600">+23% this month</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">73%</div>
                  <div className="text-sm text-gray-600">Positive Moods</div>
                  <div className="text-xs text-green-600">+5% this month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Insights Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Positive Trend Detections</span>
                  <Badge className="bg-green-100 text-green-800">342</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Pattern Recognition</span>
                  <Badge className="bg-blue-100 text-blue-800">156</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Crisis Interventions</span>
                  <Badge className="bg-red-100 text-red-800">23</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Send email alerts for important events</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Crisis Detection</p>
                    <p className="text-sm text-gray-600">AI-powered crisis intervention settings</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Data Retention</p>
                    <p className="text-sm text-gray-600">Manage data retention policies</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Data Encryption</p>
                    <p className="text-sm text-gray-600">AES-256 encryption enabled</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Access Logs</p>
                    <p className="text-sm text-gray-600">Monitor system access</p>
                  </div>
                  <Button variant="outline" size="sm">View Logs</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Backup Status</p>
                    <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Client Details Modal */}
      {selectedClient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedClient(null)}
        >
          <Card 
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedClient.name}</CardTitle>
                  <CardDescription>{selectedClient.email}</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedClient(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-calm-50 rounded-lg">
                  <div className="text-3xl font-bold text-calm-600">{selectedClient.totalEntries}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round(selectedClient.averageScore * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedClient.positiveDays}
                  </div>
                  <div className="text-sm text-gray-600">Positive Days</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Mood Entries</h3>
                <div className="space-y-4">
                  {selectedClient.recentMoods.map((mood, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSentimentColor(mood.sentiment)}>
                            {mood.sentiment}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {Math.round(mood.score * 100)}% confidence
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(mood.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{mood.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
