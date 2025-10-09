'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { 
  Heart, 
  Shield, 
  Lock, 
  Eye, 
  Database,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText
} from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const privacyPrinciples = [
    {
      icon: <Lock className="w-6 h-6 text-green-500" />,
      title: "Data Encryption",
      description: "All your data is encrypted using industry-standard AES-256 encryption"
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      title: "Minimal Data Collection",
      description: "We only collect data necessary to provide our mental health services"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Secure Storage",
      description: "Your data is stored in secure, HIPAA-compliant data centers"
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: "No Data Sharing",
      description: "We never sell or share your personal information with third parties"
    }
  ]

  const dataTypes = [
    {
      type: "Mood Logs",
      description: "Your daily mood entries and emotional reflections",
      purpose: "To provide personalized insights and track your mental health journey"
    },
    {
      type: "Chat History",
      description: "Conversations with our AI mental health companion",
      purpose: "To improve our AI responses and provide better support"
    },
    {
      type: "Account Information",
      description: "Email, name, and basic profile information",
      purpose: "To create and manage your account securely"
    },
    {
      type: "Usage Analytics",
      description: "How you interact with our platform (anonymized)",
      purpose: "To improve our services and user experience"
    }
  ]

  const yourRights = [
    "Access your personal data at any time",
    "Request correction of inaccurate information",
    "Delete your account and all associated data",
    "Export your data in a portable format",
    "Opt out of non-essential data processing",
    "Request information about how your data is used"
  ]

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

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-calm-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-calm-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your privacy is our priority. Learn how we protect your mental health data 
              and respect your confidentiality.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-xl text-gray-600">
              We follow strict privacy principles to protect your mental health data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {principle.icon}
                    </div>
                    <CardTitle className="text-lg">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {principle.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data We Collect */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Data We Collect
            </h2>
            <p className="text-xl text-gray-600">
              Transparency about what information we collect and why
            </p>
          </motion.div>

          <div className="space-y-6">
            {dataTypes.map((data, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-calm-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Database className="w-6 h-6 text-calm-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {data.type}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {data.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Purpose:</strong> {data.purpose}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-xl text-gray-600">
              You have complete control over your personal data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Data Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {yourRights.slice(0, 3).map((right, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{right}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  Additional Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {yourRights.slice(3).map((right, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{right}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16 bg-gradient-to-r from-calm-50 to-mint/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Security Measures
            </h2>
            <p className="text-xl text-gray-600">
              How we protect your sensitive mental health data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Encryption</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All data is encrypted in transit and at rest using AES-256 encryption
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>HIPAA Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We follow HIPAA guidelines for handling sensitive health information
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Strict access controls ensure only authorized personnel can view your data
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Questions About Privacy?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contact our privacy team if you have any questions about how we handle your data
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-calm-600 hover:bg-calm-700">
                Contact Privacy Team
              </Button>
              <Button size="lg" variant="outline">
                Download Full Policy
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
