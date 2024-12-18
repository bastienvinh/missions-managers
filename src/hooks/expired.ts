import { MissionDTO } from "@/app/dal/missions-dal"
import { getExpiredMisisonsService } from "@/services/missions/missions-service"
import { useEffect, useState } from "react"

export type ExpiredMissionsDTO = Omit<MissionDTO, 'technologies'> & {
  technologies: object[]
}

export default function useExpired() {
  const [missions, setMissions] = useState<ExpiredMissionsDTO[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    getExpiredMisisonsService().then(setMissions)
  }, [setMissions, count])

  function refresh() {
    setCount(old => old + 1)
  }

  return { missions, refresh }
}