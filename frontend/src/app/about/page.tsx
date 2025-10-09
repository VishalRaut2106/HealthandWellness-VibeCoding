'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { 
  Heart, 
  Brain, 
  Shield, 
  Users, 
  BarChart3, 
  MessageCircle,
  ArrowLeft,
  CheckCircle,
  Star,
  Award
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Mood Tracking",
      description: "Log your daily emotions and track patterns over time with AI-powered sentiment analysis."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "AI Insights",
      description: "Get personalized recommendations and insights based on your mood patterns and trends."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "Analytics Dashboard",
      description: "Visualize your emotional journey with beautiful charts and comprehensive analytics."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      title: "Mental Health Chatbot",
      description: "24/7 AI companion providing emotional support and mental health guidance."
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-500" />,
      title: "Privacy First",
      description: "Your data is encrypted and secure. We prioritize your privacy and confidentiality."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Professional Support",
      description: "Connect with mental health professionals and get expert guidance when needed."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Users Helped" },
    { number: "50,000+", label: "Mood Logs" },
    { number: "98%", label: "User Satisfaction" },
    { number: "24/7", label: "AI Support" }
  ]

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      description: "Licensed psychologist with 15+ years of experience in digital mental health."
    },
    {
      name: "Alex Chen",
      role: "AI Research Lead",
      description: "Machine learning expert specializing in natural language processing and mental health AI."
    },
    {
      name: "Maria Rodriguez",
      role: "Product Director",
      description: "UX designer passionate about creating accessible mental health technology."
    }
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-calm-600">MoodMate AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're revolutionizing mental health support through AI-powered mood tracking, 
              personalized insights, and 24/7 emotional support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-calm-600 hover:bg-calm-700">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-calm-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive mental health support powered by cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-calm-50 to-mint/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that everyone deserves access to mental health support. 
                Our AI-powered platform makes mental wellness accessible, affordable, 
                and effective for people everywhere.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Evidence-based mental health support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Privacy-first approach to data protection</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 AI companion for emotional support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Professional mental health resources</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-calm-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Join Our Community
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Be part of a supportive community focused on mental wellness and personal growth.
                  </p>
                  <Button className="w-full">
                    Start Your Journey
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mental health experts, AI researchers, and passionate developers working together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-calm-600" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-calm-600 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-calm-600 to-calm-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Mental Health Journey?
            </h2>
            <p className="text-xl text-calm-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already improving their mental wellness with MoodMate AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-calm-600">
                Learn More
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
