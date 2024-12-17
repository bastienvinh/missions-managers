import { getMissionsDal, MissionDal } from "@/app/dal/missions-dal"
import { useEffect, useState } from "react"

export interface UseMissionsOptions { term: string, page: 1, limit: 15, filter?: { companies?: string[] } }

export default function useMissions(options?: UseMissionsOptions) {
  const [missions, setMissions] = useState<MissionDal[]>([])
  const [refreshCount, setRefreshCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getMissionsDal(options).then((missions) => {
      setMissions(missions)
    })
    .finally(() => setIsLoading(false))
  }, [options, refreshCount])

  function refresh() {
    setRefreshCount((old) => old + 1)
  }

  return { missions, refresh, isLoading }
}