import { useEffect, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { getSourcesService } from "@/services/missions/missions-service"

type Sources = Awaited<ReturnType<typeof getSourcesService>>

interface SourceMissionsProps {
  source?: string
  onSourceChange?: (source: string) => void
}

export default function SourceMissions({ source, onSourceChange }: SourceMissionsProps) {

  const [sources, setSources] = useState<Sources>([])

  useEffect(() => {
    getSourcesService().then(sources => {
      setSources(sources)
    })
  }, [onSourceChange])

  return (
    <Select defaultValue={source} value={source} onValueChange={value => onSourceChange && onSourceChange(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a source" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sources.map(source => <SelectItem key={source.id} value={source.id}>{source.name}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
