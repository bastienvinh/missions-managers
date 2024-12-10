"use client"

import * as React from "react"
import { Star } from 'lucide-react'
import { cn } from "@/lib/utils"

export interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  onRatingChange: (rating: number) => void
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  ({ rating, onRatingChange, className, ...props }, ref) => {
    const [hover, setHover] = React.useState(0)

    return (
      <div ref={ref} className={cn("flex items-center space-x-1", className)} {...props}>
        {[...Array(10)].map((_, index) => {
          const currentRating = index + 1
          return (
            <button
              key={index}
              type="button"
              className={cn(
                "transition-colors duration-200",
                currentRating <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
              )}
              onClick={() => onRatingChange(currentRating)}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            >
              <Star className="h-6 w-6 fill-current" />
              <span className="sr-only">{`${currentRating} stars`}</span>
            </button>
          )
        })}
      </div>
    )
  }
)

StarRating.displayName = 'StarRating'

export default StarRating
