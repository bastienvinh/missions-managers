import { getMissionsDal, MissionDTO } from "@/app/dal/missions-dal"
import { useEffect, useState } from "react"

export interface UseMissionsOptions { term: string, page: number, limit: number, filter?: { companies?: string[], technologies?: string[] } }

export default function useMissions(options?: UseMissionsOptions) {
  const [missions, setMissions] = useState<MissionDTO[]>([])
  const [total, setTotal] = useState(0)
  const [refreshCount, setRefreshCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getMissionsDal(options).then((res) => {
      setMissions(res.result)
      setTotal(res.total)
    })
    .finally(() => setIsLoading(false))
  }, [options, refreshCount])

  function refresh() {
    setRefreshCount((old) => old + 1)
  }

  return { missions, refresh, isLoading, total }
}