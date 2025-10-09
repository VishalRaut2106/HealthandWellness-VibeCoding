'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, User, ArrowRight } from 'lucide-react'

interface LoginFormProps {
  onPatientLogin: () => void
  onAdminLogin: () => void
}

export function LoginForm({ onPatientLogin, onAdminLogin }: LoginFormProps) {
  const [loginType, setLoginType] = useState<'patient' | 'admin' | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Mock authentication logic
      if (loginType === 'admin') {
        // Admin login logic
        if (email === 'admin@moodmate.com' && password === 'admin123') {
          onAdminLogin()
        } else {
          setError('Invalid admin credentials')
        }
      } else if (loginType === 'patient') {
        // Patient login logic - for demo, accept any email/password
        if (email && password) {
          onPatientLogin()
        } else {
          setError('Please enter email and password')
        }
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!loginType) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint/20 via-sky/20 to-rose/20 p-4"
      >
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-calm-700 mb-2">
              Welcome to MoodMate AI
            </CardTitle>
            <CardDescription className="text-lg">
              Choose how you'd like to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Login */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-calm-300"
                  onClick={() => setLoginType('patient')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-calm-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Patient Login
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Track your mood, view insights, and monitor your mental wellness journey.
                    </p>
                    <Button className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Login as Patient
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Admin Login */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300"
                  onClick={() => setLoginType('admin')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Admin Login
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Monitor clients, view analytics, and manage the platform.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Login as Admin
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't have an account? 
                <span className="text-calm-600 font-medium ml-1">
                  Contact your healthcare provider
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint/20 via-sky/20 to-rose/20 p-4"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {loginType === 'admin' ? (
              <Shield className="w-8 h-8 text-blue-600" />
            ) : (
              <Heart className="w-8 h-8 text-calm-600" />
            )}
            <CardTitle className="text-2xl font-bold">
              {loginType === 'admin' ? 'Admin Login' : 'Patient Login'}
            </CardTitle>
          </div>
          <CardDescription>
            {loginType === 'admin' 
              ? 'Access the admin dashboard to monitor clients'
              : 'Access your personal mood tracking dashboard'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-destructive"
              >
                {error}
              </motion.p>
            )}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLoginType(null)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          
          {loginType === 'admin' && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                <strong>Demo Credentials:</strong><br />
                Email: admin@moodmate.com<br />
                Password: admin123
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
