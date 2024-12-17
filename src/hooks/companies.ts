import { getCompaniesService } from "@/services/missions/missions-service"
import { useEffect, useState } from "react"

export default function useCompanies() {
  const [companies, setCompanies] = useState<string[]>([])

  useEffect(() => {
    getCompaniesService().then(setCompanies)
  }, [])

  return { companies }
}