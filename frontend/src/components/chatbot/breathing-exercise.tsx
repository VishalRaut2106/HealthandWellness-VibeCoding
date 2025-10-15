'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Pause, RotateCcw, Wind } from 'lucide-react'

interface BreathingExerciseProps {
  onClose: () => void
}

export function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale')
  const [count, setCount] = useState(4)
  const [round, setRound] = useState(1)
  const [totalRounds] = useState(4)

  const phases = {
    inhale: { duration: 4000, next: 'hold' as const, color: 'bg-green-400' },
    hold: { duration: 4000, next: 'exhale' as const, color: 'bg-blue-400' },
    exhale: { duration: 6000, next: 'rest' as const, color: 'bg-purple-400' },
    rest: { duration: 2000, next: 'inhale' as const, color: 'bg-gray-400' }
  }

  const phaseInstructions = {
    inhale: 'Breathe in slowly through your nose',
    hold: 'Hold your breath gently',
    exhale: 'Breathe out slowly through your mouth',
    rest: 'Rest and prepare for the next breath'
  }

  const phaseCounts = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2
  }

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          const currentPhaseData = phases[currentPhase]
          setCurrentPhase(currentPhaseData.next)
          return phaseCounts[currentPhaseData.next]
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, currentPhase])

  useEffect(() => {
    if (currentPhase === 'inhale' && count === phaseCounts.inhale && round < totalRounds) {
      setRound(prev => prev + 1)
    } else if (currentPhase === 'inhale' && count === phaseCounts.inhale && round >= totalRounds) {
      setIsActive(false)
      setRound(1)
      setCurrentPhase('inhale')
      setCount(4)
    }
  }, [currentPhase, count, round, totalRounds])

  const handleStart = () => {
    setIsActive(true)
    setRound(1)
    setCurrentPhase('inhale')
    setCount(4)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setRound(1)
    setCurrentPhase('inhale')
    setCount(4)
  }

  const getProgressPercentage = () => {
    const totalCycles = totalRounds * 4 // inhale, hold, exhale, rest
    const currentCycle = (round - 1) * 4
    const phaseIndex = ['inhale', 'hold', 'exhale', 'rest'].indexOf(currentPhase)
    const currentProgress = currentCycle + phaseIndex + (1 - count / phaseCounts[currentPhase])
    return (currentProgress / totalCycles) * 100
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
        className="w-full max-w-md"
      >
        <Card className="bg-white">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wind className="w-6 h-6 text-calm-600" />
              <CardTitle>Breathing Exercise</CardTitle>
            </div>
            <CardDescription>
              Follow the guided breathing to help reduce stress and anxiety
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-calm-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Round Counter */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Round {round} of {totalRounds}</p>
            </div>

            {/* Breathing Circle */}
            <div className="flex justify-center">
              <motion.div
                className={`w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-2xl ${phases[currentPhase].color}`}
                animate={isActive ? {
                  scale: currentPhase === 'inhale' ? [1, 1.3, 1] : 
                         currentPhase === 'hold' ? [1.3, 1.3, 1.3] :
                         currentPhase === 'exhale' ? [1.3, 1, 1] : [1, 1, 1],
                  opacity: currentPhase === 'rest' ? [1, 0.7, 1] : 1
                } : {}}
                transition={{
                  duration: currentPhase === 'inhale' ? 4 :
                           currentPhase === 'hold' ? 4 :
                           currentPhase === 'exhale' ? 6 : 2,
                  repeat: isActive ? Infinity : 0
                }}
              >
                {count}
              </motion.div>
            </div>

            {/* Instructions */}
            <div className="text-center">
              <motion.p
                key={currentPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-gray-800"
              >
                {phaseInstructions[currentPhase]}
              </motion.p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              {!isActive ? (
                <Button
                  onClick={handleStart}
                  className="bg-calm-500 hover:bg-calm-600 text-white px-6"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  variant="outline"
                  className="px-6"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-6"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Benefits */}
            <div className="bg-calm-50 rounded-lg p-4">
              <h4 className="font-medium text-calm-800 mb-2">Benefits of this exercise:</h4>
              <ul className="text-sm text-calm-700 space-y-1">
                <li>• Reduces stress and anxiety</li>
                <li>• Improves focus and concentration</li>
                <li>• Activates the parasympathetic nervous system</li>
                <li>• Promotes better sleep</li>
              </ul>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-gray-500"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

