'use client'

import { Badge } from "@/components/ui/badge"

export default function TechnnologiesBadgeList({ technologies, limit }: { technologies: string[], limit?: number, primary?: string[] }) {
  return (
    <span className="flex gap-1 items-center">
      {technologies.slice(0, technologies.length < (limit ?? 4) ? technologies.length : (limit ?? 4)).map((techno, index) => (
        <Badge className="h-[1rem] w-fit text-nowrap" variant="outline" key={index}>{techno}</Badge>
      ))}
    </span>
  )
}