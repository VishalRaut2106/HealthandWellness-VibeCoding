'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Hand, Ear, Flower, Utensils, CheckCircle, RotateCcw } from 'lucide-react'

interface GroundingExerciseProps {
  onClose: () => void
}

interface GroundingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  placeholder: string
  userInput: string
  completed: boolean
}

export function GroundingExercise({ onClose }: GroundingExerciseProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<GroundingStep[]>([
    {
      id: 'see',
      title: '5 Things You Can See',
      description: 'Look around and name 5 things you can see',
      icon: <Eye className="w-6 h-6" />,
      placeholder: 'e.g., blue sky, green tree, red car...',
      userInput: '',
      completed: false
    },
    {
      id: 'touch',
      title: '4 Things You Can Touch',
      description: 'Name 4 things you can touch or feel',
      icon: <Hand className="w-6 h-6" />,
      placeholder: 'e.g., soft blanket, cool air, rough table...',
      userInput: '',
      completed: false
    },
    {
      id: 'hear',
      title: '3 Things You Can Hear',
      description: 'Listen carefully and name 3 things you can hear',
      icon: <Ear className="w-6 h-6" />,
      placeholder: 'e.g., birds singing, traffic noise, your breathing...',
      userInput: '',
      completed: false
    },
    {
      id: 'smell',
      title: '2 Things You Can Smell',
      description: 'Take a deep breath and name 2 things you can smell',
      icon: <Flower className="w-6 h-6" />,
      placeholder: 'e.g., fresh air, coffee, flowers...',
      userInput: '',
      completed: false
    },
    {
      id: 'taste',
      title: '1 Thing You Can Taste',
      description: 'Notice what you can taste right now',
      icon: <Utensils className="w-6 h-6" />,
      placeholder: 'e.g., mint from toothpaste, coffee, nothing...',
      userInput: '',
      completed: false
    }
  ])

  const handleInputChange = (stepId: string, value: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, userInput: value, completed: value.trim().length > 0 }
        : step
    ))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setSteps(prev => prev.map(step => ({ ...step, userInput: '', completed: false })))
  }

  const completedSteps = steps.filter(step => step.completed).length
  const isComplete = completedSteps === steps.length

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
        className="w-full max-w-lg"
      >
        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-calm-100 rounded-full flex items-center justify-center">
                {steps[currentStep].icon}
              </div>
              5-4-3-2-1 Grounding Technique
            </CardTitle>
            <CardDescription>
              This technique helps you feel more present and calm by focusing on your senses
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Progress */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-calm-600 font-medium">
                {completedSteps}/{steps.length} completed
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-calm-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Current Step */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-gray-600">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="space-y-3">
                <textarea
                  value={steps[currentStep].userInput}
                  onChange={(e) => handleInputChange(steps[currentStep].id, e.target.value)}
                  placeholder={steps[currentStep].placeholder}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-500 focus:border-transparent resize-none"
                  rows={3}
                />
                
                {steps[currentStep].completed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-green-600 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Great! You've completed this step.
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="px-4"
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="px-3"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!steps[currentStep].completed}
                    className="bg-calm-500 hover:bg-calm-600 text-white px-4"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={onClose}
                    className="bg-green-500 hover:bg-green-600 text-white px-4"
                  >
                    Complete
                  </Button>
                )}
              </div>
            </div>

            {/* Completion Message */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
              >
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800 mb-1">Exercise Complete!</h4>
                <p className="text-green-700 text-sm">
                  You've successfully completed the grounding exercise. How do you feel now?
                </p>
              </motion.div>
            )}

            {/* Benefits */}
            <div className="bg-calm-50 rounded-lg p-4">
              <h4 className="font-medium text-calm-800 mb-2">Why this works:</h4>
              <ul className="text-sm text-calm-700 space-y-1">
                <li>• Helps you focus on the present moment</li>
                <li>• Reduces anxiety and panic symptoms</li>
                <li>• Activates your senses to ground you</li>
                <li>• Can be done anywhere, anytime</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
