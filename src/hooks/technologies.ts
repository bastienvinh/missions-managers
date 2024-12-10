import { getTechnologiesService } from "@/services/missions/missions-service"
import { Technology } from "@/types/missions-types"
import { useEffect, useState } from "react"

export default function useTechnologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  
  // TODO: Manage Error

  useEffect(() => {
    getTechnologiesService().then(setTechnologies)
  }, [])


  return { technologies }
}