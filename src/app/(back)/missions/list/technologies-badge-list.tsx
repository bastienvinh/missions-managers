'use server'

import { Badge } from "@/components/ui/badge"

export default async function TechnnologiesBadgeList({ technologies, limit }: { technologies: string[], limit?: number, primary?: string[] }) {
  return (
    <span className="flex gap-1 items-center">
      {technologies.slice(0, limit).map((techno, index) => (
        <Badge className="h-[1rem] w-fit" variant="outline" key={index}>{techno}</Badge>
      ))}
    </span>
  )
}