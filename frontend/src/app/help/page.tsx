'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Footer } from '@/components/layout/footer'
import { 
  Heart, 
  HelpCircle, 
  Search,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  BookOpen,
  Lightbulb,
  Shield,
  Users
} from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button on the homepage, enter your email and password, and follow the verification steps. It's completely free to get started."
        },
        {
          question: "Is MoodMate AI free to use?",
          answer: "Yes! Our basic mood tracking and AI insights are completely free. We also offer premium features for advanced analytics and professional support."
        },
        {
          question: "How do I log my first mood?",
          answer: "After logging in, click 'Log Mood' in the navigation. Write about how you're feeling, select an emoji if you'd like, and our AI will analyze your sentiment."
        }
      ]
    },
    {
      title: "Features & Usage",
      icon: <Lightbulb className="w-5 h-5 text-green-500" />,
      faqs: [
        {
          question: "How does the AI sentiment analysis work?",
          answer: "Our AI analyzes the emotional tone of your mood entries using advanced natural language processing. It identifies positive, negative, or neutral sentiments and provides confidence scores."
        },
        {
          question: "Can I export my mood data?",
          answer: "Yes! You can export your mood logs and analytics in CSV format from your dashboard. This helps you share insights with healthcare providers."
        },
        {
          question: "How often should I log my mood?",
          answer: "We recommend logging your mood daily for the best insights. However, you can log as often as you'd like - some users log multiple times per day."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      faqs: [
        {
          question: "Is my mental health data secure?",
          answer: "Absolutely. We use industry-standard encryption (AES-256) and follow HIPAA guidelines. Your data is never shared with third parties without your explicit consent."
        },
        {
          question: "Can I delete my account and data?",
          answer: "Yes, you have complete control. You can delete your account and all associated data at any time from your settings page. This action is irreversible."
        },
        {
          question: "Who can see my mood logs?",
          answer: "Only you can see your personal mood logs. Admins can see anonymized analytics for platform improvement, but never your personal entries."
        }
      ]
    },
    {
      title: "Support & Help",
      icon: <Users className="w-5 h-5 text-orange-500" />,
      faqs: [
        {
          question: "How do I contact support?",
          answer: "You can reach our support team via email at support@moodmate.ai, through our live chat feature, or by calling our support line during business hours."
        },
        {
          question: "What if I'm having a mental health crisis?",
          answer: "If you're in crisis, please contact emergency services (911) or the Suicide & Crisis Lifeline (988) immediately. MoodMate AI is not a substitute for emergency mental health care."
        },
        {
          question: "Can I get professional mental health support through the app?",
          answer: "Yes! We can connect you with licensed mental health professionals through our partner network. Look for the 'Professional Support' option in your dashboard."
        }
      ]
    }
  ]

  const quickActions = [
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
      title: "Live Chat",
      description: "Chat with our AI support",
      action: "Start Chat"
    },
    {
      icon: <Phone className="w-6 h-6 text-green-500" />,
      title: "Phone Support",
      description: "Call our support team",
      action: "Call Now"
    },
    {
      icon: <Mail className="w-6 h-6 text-purple-500" />,
      title: "Email Support",
      description: "Send us an email",
      action: "Send Email"
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

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
              <HelpCircle className="w-10 h-10 text-calm-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Help & <span className="text-calm-600">Support</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find answers to common questions and get the support you need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-xl text-gray-600">
              Get support through our various channels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {action.icon}
                    </div>
                    <CardTitle className="text-xl">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      {action.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about MoodMate AI
            </p>
          </motion.div>

          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.icon}
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <div key={faqIndex} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                          <button
                            onClick={() => toggleFAQ(categoryIndex * 100 + faqIndex)}
                            className="w-full text-left flex items-center justify-between py-2"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                            {expandedFAQ === categoryIndex * 100 + faqIndex ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedFAQ === categoryIndex * 100 + faqIndex && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-gray-600 leading-relaxed pt-2">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {searchQuery && filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-4">
                Try searching with different keywords or contact our support team.
              </p>
              <Button onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our support team is here to help you with any questions or issues
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-calm-600 hover:bg-calm-700">
                Contact Support
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Call
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
