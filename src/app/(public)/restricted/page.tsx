/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-2">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto" />
          <h1 className="text-3xl font-bold tracking-tighter">Access Restricted</h1>
          <p className="text-gray-400">This area is off-limits. Turn back or contact support.</p>
        </div>
        
        <div className="h-2 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />
        
        <div className="space-y-4 text-sm text-gray-400">
          <p>You've stumbled upon a restricted area. This could be due to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Insufficient permissions</li>
            <li>Expired credentials</li>
            <li>Restricted content</li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Button asChild variant="outline" className="bg-transparent text-white border-gray-700 hover:bg-gray-800">
            <Link href="/" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
          {/* <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
            <Link href="/contact" className="flex items-center justify-center">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Link>
          </Button> */}
        </div>
        
        <p className="text-center text-xs text-gray-500">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  )
}

