import { getMissionsDal, MissionDal } from "@/app/dal/missions-dal"
import { useEffect, useState } from "react"

export default function useMissions(term?: string, page?: number, limit?:number) {
  const [missions, setMissions] = useState<MissionDal[]>([])
  const [refreshCount, setRefreshCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // TODO: Manage error
    setIsLoading(true)
    getMissionsDal({ term, page, limit }).then(setMissions).finally(() => setIsLoading(false))    
  }, [term, page, limit, refreshCount])

  function refresh() {
    if (!isLoading) {
      setRefreshCount((old) => old + 1)
    }
  }

  return { missions, refresh, isLoading }
}