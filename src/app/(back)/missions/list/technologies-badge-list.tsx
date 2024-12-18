'use client'

import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function TechnnologiesBadgeList({ technologies }: { technologies: string[] }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className="text-nowrap h-6" variant={"outline"}>Technologies {technologies.length ? `+(${technologies.length})`: ''}</Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-start gap-2 w-[150px]">
          {technologies.length ? technologies.map((techno, index) => <Badge className="h-6 text-nowrap" key={index} variant="outline">{techno}</Badge>) : 'No Tehcnologies'}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}