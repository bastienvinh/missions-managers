/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
      <h2 className="text-2xl mb-4 text-secondary-foreground">Page Not Found</h2>
      <p className="text-center mb-8 max-w-md text-muted-foreground">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link href="/">
        <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
          Return to Home
        </Button>
      </Link>
    </div>
  )
}
