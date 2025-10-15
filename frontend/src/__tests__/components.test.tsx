/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MoodLogger } from '@/components/mood/mood-logger'
import { PatientDashboard } from '@/components/patient/patient-dashboard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { DataExport } from '@/components/data-export'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => ({
            execute: jest.fn(() => Promise.resolve({ data: [], error: null }))
          }))
        }))
      })),
      insert: jest.fn(() => ({
        execute: jest.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }
}))

describe('MoodLogger Component', () => {
  test('renders mood logging form', () => {
    const mockOnLogSaved = jest.fn()
    render(<MoodLogger onLogSaved={mockOnLogSaved} />)
    
    expect(screen.getByText('How are you feeling today?')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell us about your day...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log mood/i })).toBeInTheDocument()
  })

  test('allows user to input mood text', () => {
    const mockOnLogSaved = jest.fn()
    render(<MoodLogger onLogSaved={mockOnLogSaved} />)
    
    const textarea = screen.getByPlaceholderText('Tell us about your day...')
    fireEvent.change(textarea, { target: { value: 'I feel great today!' } })
    
    expect(textarea).toHaveValue('I feel great today!')
  })

  test('shows emoji selection', () => {
    const mockOnLogSaved = jest.fn()
    render(<MoodLogger onLogSaved={mockOnLogSaved} />)
    
    expect(screen.getByText('Select an emoji (optional)')).toBeInTheDocument()
    expect(screen.getByText('😊')).toBeInTheDocument()
    expect(screen.getByText('😔')).toBeInTheDocument()
    expect(screen.getByText('😐')).toBeInTheDocument()
  })

  test('handles form submission', async () => {
    const mockOnLogSaved = jest.fn()
    render(<MoodLogger onLogSaved={mockOnLogSaved} />)
    
    const textarea = screen.getByPlaceholderText('Tell us about your day...')
    const submitButton = screen.getByRole('button', { name: /log mood/i })
    
    fireEvent.change(textarea, { target: { value: 'Feeling good today!' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnLogSaved).toHaveBeenCalled()
    })
  })
})

describe('PatientDashboard Component', () => {
  test('renders welcome message', () => {
    const mockProps = {
      onLogout: jest.fn(),
      onStartLogging: jest.fn(),
      onViewDashboard: jest.fn(),
      onViewInsights: jest.fn()
    }
    
    render(<PatientDashboard {...mockProps} />)
    
    expect(screen.getByText('Welcome back!')).toBeInTheDocument()
    expect(screen.getByText('How are you feeling today?')).toBeInTheDocument()
  })

  test('renders quick actions', () => {
    const mockProps = {
      onLogout: jest.fn(),
      onStartLogging: jest.fn(),
      onViewDashboard: jest.fn(),
      onViewInsights: jest.fn()
    }
    
    render(<PatientDashboard {...mockProps} />)
    
    expect(screen.getByText('Log Mood')).toBeInTheDocument()
    expect(screen.getByText('View Dashboard')).toBeInTheDocument()
    expect(screen.getByText('AI Insights')).toBeInTheDocument()
  })

  test('calls appropriate handlers on button click', () => {
    const mockProps = {
      onLogout: jest.fn(),
      onStartLogging: jest.fn(),
      onViewDashboard: jest.fn(),
      onViewInsights: jest.fn()
    }
    
    render(<PatientDashboard {...mockProps} />)
    
    fireEvent.click(screen.getByText('Log Mood'))
    expect(mockProps.onStartLogging).toHaveBeenCalled()
    
    fireEvent.click(screen.getByText('View Dashboard'))
    expect(mockProps.onViewDashboard).toHaveBeenCalled()
    
    fireEvent.click(screen.getByText('AI Insights'))
    expect(mockProps.onViewInsights).toHaveBeenCalled()
  })
})

describe('AdminDashboard Component', () => {
  test('renders admin dashboard', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Monitor client progress and mental health insights')).toBeInTheDocument()
  })

  test('shows overview stats', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('Total Clients')).toBeInTheDocument()
    expect(screen.getByText('Active Clients')).toBeInTheDocument()
    expect(screen.getByText('Need Attention')).toBeInTheDocument()
    expect(screen.getByText('Total Entries')).toBeInTheDocument()
  })

  test('displays client cards', async () => {
    render(<AdminDashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('Mike Johnson')).toBeInTheDocument()
    })
  })

  test('allows client selection', async () => {
    render(<AdminDashboard />)
    
    await waitFor(() => {
      const clientCard = screen.getByText('John Doe')
      fireEvent.click(clientCard)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Recent Mood Entries')).toBeInTheDocument()
    })
  })
})

describe('DataExport Component', () => {
  test('renders export form', () => {
    render(<DataExport />)
    
    expect(screen.getByText('Export Your Data')).toBeInTheDocument()
    expect(screen.getByText('Choose what data to include in your export')).toBeInTheDocument()
  })

  test('shows format selection', () => {
    render(<DataExport />)
    
    expect(screen.getByText('JSON')).toBeInTheDocument()
    expect(screen.getByText('CSV')).toBeInTheDocument()
    expect(screen.getByText('PDF')).toBeInTheDocument()
  })

  test('displays data type options', () => {
    render(<DataExport />)
    
    expect(screen.getByText('Mood Logs')).toBeInTheDocument()
    expect(screen.getByText('AI Insights')).toBeInTheDocument()
    expect(screen.getByText('Achievements')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Chat History')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  test('allows format selection', () => {
    render(<DataExport />)
    
    const csvButton = screen.getByText('CSV')
    fireEvent.click(csvButton)
    
    expect(csvButton).toHaveClass('bg-primary')
  })

  test('allows data type selection', () => {
    render(<DataExport />)
    
    const moodLogsCheckbox = screen.getByLabelText(/mood logs/i)
    fireEvent.click(moodLogsCheckbox)
    
    expect(moodLogsCheckbox).toBeChecked()
  })

  test('handles export process', async () => {
    render(<DataExport />)
    
    const exportButton = screen.getByText('Start Export')
    fireEvent.click(exportButton)
    
    await waitFor(() => {
      expect(screen.getByText('Exporting your data...')).toBeInTheDocument()
    })
  })
})

describe('Accessibility Tests', () => {
  test('MoodLogger has proper ARIA labels', () => {
    const mockOnLogSaved = jest.fn()
    render(<MoodLogger onLogSaved={mockOnLogSaved} />)
    
    const textarea = screen.getByPlaceholderText('Tell us about your day...')
    expect(textarea).toHaveAttribute('aria-label')
  })

  test('AdminDashboard has proper heading structure', () => {
    render(<AdminDashboard />)
    
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveTextContent('Admin Dashboard')
  })

  test('DataExport form is keyboard navigable', () => {
    render(<DataExport />)
    
    const formatButtons = screen.getAllByRole('button')
    formatButtons.forEach(button => {
      expect(button).not.toHaveAttribute('tabindex', '-1')
    })
  })
})

describe('Integration Tests', () => {
  test('complete mood logging flow', async () => {
    const mockOnLogSaved = jest.fn()
    render(<MoodLogger onLogSaved={mockOnLogSaved} />)
    
    // Fill in mood text
    const textarea = screen.getByPlaceholderText('Tell us about your day...')
    fireEvent.change(textarea, { target: { value: 'Had a great day at work!' } })
    
    // Select emoji
    const happyEmoji = screen.getByText('😊')
    fireEvent.click(happyEmoji)
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /log mood/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnLogSaved).toHaveBeenCalled()
    })
  })

  test('admin dashboard client interaction', async () => {
    render(<AdminDashboard />)
    
    // Wait for clients to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    
    // Click on a client
    const clientCard = screen.getByText('John Doe')
    fireEvent.click(clientCard)
    
    // Check if modal opens
    await waitFor(() => {
      expect(screen.getByText('Recent Mood Entries')).toBeInTheDocument()
    })
    
    // Close modal
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Recent Mood Entries')).not.toBeInTheDocument()
    })
  })
})
