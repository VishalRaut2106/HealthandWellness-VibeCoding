'use client'

import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/10 via-sky/10 to-rose/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-calm-600" />
              <h1 className="text-xl font-bold text-calm-700">Admin Dashboard</h1>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}