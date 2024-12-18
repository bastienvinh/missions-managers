'use client'

import StatsCardContent from "@/components/stats-card-content"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import useExpired from "@/hooks/expired"
import { destroyExpiredMissionsService } from "@/services/missions/missions-service"
import _ from "lodash"
import { useState } from "react"
import { toast } from "sonner"

export default function ExpiresCard() {
  const { missions, refresh } = useExpired()
  const [isLoading, setIsLoading] = useState(false)

  async function removeExpired() {
    try {
      setIsLoading(true)
      await destroyExpiredMissionsService()
      toast.success(`Remove ${missions.length} missions on database`)
    } catch {
      toast.error('Impossible to empty the database')
    } finally {
      setIsLoading(false)
      refresh()
    }
  }

  return (
    <Card className="flex flex-col gap-2 rounded-2xl">
      <CardHeader className="my-0 py-0 pt-6">
        <CardTitle className="flex justify-between tracking-tight text-sm font-medium">
          <span>Expired</span> 
          {!!missions.length && <Tooltip>
            <TooltipTrigger>
            <AlertDialog>
              <AlertDialogTrigger disabled={isLoading} asChild>
                <div className="inline-flex items-center justify-center h-6 px-4 py-1 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md text-white font-medium">Clean</div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will permently delete {missions.length} missions in the database. There is no backup. No going back.
                    Do as you please.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction disabled={isLoading} onClick={removeExpired}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </TooltipTrigger>
            <TooltipContent className="mb-4 bg-black text-white">
              <p className="text-wrap w-20">Will remove all the expired missions on database</p>
            </TooltipContent>
          </Tooltip>}
          {!missions.length && <div className="rounded bg-green-500 text-white h-6 px-2 flex items-center">Clear</div>}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-start my-0 py-0 pb-6">
        <StatsCardContent label="+20% from last month" value={missions.length.toString()} />
      </CardContent>
    </Card>
  )
}