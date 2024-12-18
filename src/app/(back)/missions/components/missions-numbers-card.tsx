'use server'

import { getMissionsDal } from "@/app/dal/missions-dal"
import StatsCardContent from "@/components/stats-card-content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StickyNote } from "lucide-react"

export default async function MissionsNumbersCard() {

  const missions = await getMissionsDal()

  return (
    <Card className="flex flex-col gap-2 rounded-2xl">
      <CardHeader className="my-0 py-0 pt-6">
        <CardTitle className="flex justify-between items-center tracking-tight text-sm font-medium">Total<StickyNote /></CardTitle>
      </CardHeader>
      <CardContent className="flex justify-start my-0 py-0 pb-6">
        <StatsCardContent label="+20% from last month" value={missions.result.length.toString()} />
      </CardContent>
    </Card>
  )
}