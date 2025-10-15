'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Phone, 
  MessageCircle, 
  Globe, 
  Heart, 
  Shield, 
  Clock,
  ExternalLink,
  X,
  Search
} from 'lucide-react'

interface MentalHealthResourcesProps {
  onClose: () => void
}

interface Resource {
  id: string
  name: string
  description: string
  phone?: string
  website?: string
  text?: string
  type: 'crisis' | 'support' | 'therapy' | 'information'
  available: string
  icon: React.ReactNode
}

export function MentalHealthResources({ onClose }: MentalHealthResourcesProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')

  const resources: Resource[] = [
    {
      id: 'crisis-text',
      name: 'Crisis Text Line',
      description: 'Free, 24/7 crisis support via text message',
      text: 'Text HOME to 741741',
      type: 'crisis',
      available: '24/7',
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: 'suicide-prevention',
      name: 'National Suicide Prevention Lifeline',
      description: 'Crisis counseling and emotional support',
      phone: '988',
      type: 'crisis',
      available: '24/7',
      icon: <Phone className="w-5 h-5" />
    },
    {
      id: 'trevor-project',
      name: 'The Trevor Project',
      description: 'Crisis intervention and suicide prevention for LGBTQ+ youth',
      phone: '1-866-488-7386',
      text: 'Text START to 678-678',
      type: 'crisis',
      available: '24/7',
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: 'veterans-crisis',
      name: 'Veterans Crisis Line',
      description: 'Confidential support for veterans and their families',
      phone: '1-800-273-8255',
      text: 'Text 838255',
      type: 'crisis',
      available: '24/7',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'nami',
      name: 'NAMI Helpline',
      description: 'Information, referrals, and support for mental health',
      phone: '1-800-950-6264',
      website: 'nami.org',
      type: 'support',
      available: 'Mon-Fri 10am-6pm ET',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'psychology-today',
      name: 'Psychology Today Therapist Finder',
      description: 'Find licensed therapists in your area',
      website: 'psychologytoday.com',
      type: 'therapy',
      available: 'Online directory',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'betterhelp',
      name: 'BetterHelp',
      description: 'Online therapy platform with licensed counselors',
      website: 'betterhelp.com',
      type: 'therapy',
      available: 'Online 24/7',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'talkspace',
      name: 'Talkspace',
      description: 'Online therapy and psychiatry services',
      website: 'talkspace.com',
      type: 'therapy',
      available: 'Online 24/7',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'mindfulness-apps',
      name: 'Mindfulness Apps',
      description: 'Meditation and mindfulness resources',
      website: 'Headspace, Calm, Insight Timer',
      type: 'information',
      available: 'Mobile apps',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'emergency',
      name: 'Emergency Services',
      description: 'For immediate life-threatening situations',
      phone: '911',
      type: 'crisis',
      available: '24/7',
      icon: <Phone className="w-5 h-5" />
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || resource.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'bg-red-100 text-red-800 border-red-200'
      case 'support': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'therapy': return 'bg-green-100 text-green-800 border-green-200'
      case 'information': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'crisis': return 'Crisis Support'
      case 'support': return 'General Support'
      case 'therapy': return 'Therapy Services'
      case 'information': return 'Information'
      default: return 'Other'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="bg-white h-full flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-calm-600" />
                  Mental Health Resources
                </CardTitle>
                <CardDescription>
                  Professional support and crisis resources when you need them
                </CardDescription>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-gray-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden flex flex-col">
            {/* Search and Filter */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['all', 'crisis', 'support', 'therapy', 'information'].map(type => (
                  <Button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    variant={selectedType === type ? 'default' : 'outline'}
                    size="sm"
                    className={selectedType === type ? 'bg-calm-500 hover:bg-calm-600' : ''}
                  >
                    {getTypeLabel(type)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Resources List */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-calm-600">
                          {resource.icon}
                        </div>
                        <h3 className="font-semibold text-gray-800">{resource.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(resource.type)}`}>
                          {getTypeLabel(resource.type)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      
                      <div className="flex flex-wrap gap-3">
                        {resource.phone && (
                          <a
                            href={`tel:${resource.phone}`}
                            className="flex items-center gap-2 text-calm-600 hover:text-calm-700 text-sm font-medium"
                          >
                            <Phone className="w-4 h-4" />
                            {resource.phone}
                          </a>
                        )}
                        
                        {resource.text && (
                          <span className="flex items-center gap-2 text-calm-600 text-sm font-medium">
                            <MessageCircle className="w-4 h-4" />
                            {resource.text}
                          </span>
                        )}
                        
                        {resource.website && (
                          <a
                            href={`https://${resource.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-calm-600 hover:text-calm-700 text-sm font-medium"
                          >
                            <Globe className="w-4 h-4" />
                            {resource.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {resource.available}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredResources.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No resources found matching your search.</p>
                </div>
              )}
            </div>

            {/* Important Notice */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">Important Notice</h4>
                  <p className="text-red-700 text-sm">
                    If you're having thoughts of hurting yourself or others, please reach out for immediate help. 
                    These resources are here to support you 24/7. You're not alone, and help is available.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

