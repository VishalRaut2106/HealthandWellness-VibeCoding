'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { 
  Heart, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  ArrowLeft,
  Shield,
  Users,
  Clock,
  Scale
} from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using MoodMate AI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of MoodMate AI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials."
    },
    {
      title: "Mental Health Disclaimer",
      content: "MoodMate AI is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
    },
    {
      title: "User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password."
    },
    {
      title: "Prohibited Uses",
      content: "You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances."
    },
    {
      title: "Content Ownership",
      content: "You retain ownership of all content you submit to MoodMate AI. By submitting content, you grant us a license to use, store, and process your data to provide our services."
    }
  ]

  const keyPoints = [
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      title: "Data Protection",
      description: "Your mental health data is protected with industry-standard security measures"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      title: "Professional Support",
      description: "We encourage users to seek professional help when needed"
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      title: "Service Availability",
      description: "We strive for 99.9% uptime but cannot guarantee uninterrupted service"
    },
    {
      icon: <Scale className="w-5 h-5 text-orange-500" />,
      title: "Fair Use",
      description: "Users must comply with our fair use policies and community guidelines"
    }
  ]

  const userAgreements = [
    "I understand that MoodMate AI is not a substitute for professional mental health care",
    "I agree to use the service responsibly and in accordance with these terms",
    "I understand that my data will be processed to provide personalized insights",
    "I agree to seek professional help if I'm experiencing a mental health crisis",
    "I understand that I can delete my account and data at any time"
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
              <FileText className="w-10 h-10 text-calm-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms of <span className="text-calm-600">Service</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Please read these terms carefully before using MoodMate AI. 
              By using our service, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Points
            </h2>
            <p className="text-xl text-gray-600">
              Important information about using our mental health platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {point.icon}
                    </div>
                    <CardTitle className="text-lg">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {point.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms and Conditions
            </h2>
            <p className="text-xl text-gray-600">
              Detailed terms governing your use of MoodMate AI
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-calm-600" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Agreements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              User Agreements
            </h2>
            <p className="text-xl text-gray-600">
              By using MoodMate AI, you agree to the following
            </p>
          </motion.div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                User Responsibilities
              </CardTitle>
              <CardDescription>
                Please review and acknowledge these important agreements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userAgreements.map((agreement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{agreement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mental Health Disclaimer */}
      <section className="py-16 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Important Mental Health Disclaimer
            </h2>
            <Card className="text-left">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>MoodMate AI is not a substitute for professional mental health care.</strong>
                </p>
                <p className="text-gray-600 mb-4">
                  If you are experiencing a mental health crisis or having thoughts of self-harm, 
                  please contact emergency services immediately:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-rose-600">988</p>
                    <p className="text-sm text-gray-600">Suicide & Crisis Lifeline</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-rose-600">911</p>
                    <p className="text-sm text-gray-600">Emergency Services</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Always seek the advice of qualified health providers with any questions 
                  regarding mental health conditions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
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
              Questions About Terms?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contact our legal team if you have any questions about these terms of service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-calm-600 hover:bg-calm-700">
                Contact Legal Team
              </Button>
              <Button size="lg" variant="outline">
                Download Full Terms
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
