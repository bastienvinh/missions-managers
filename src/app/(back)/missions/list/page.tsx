'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "./data-table"
import { getColumnsDefinitions } from "./columns"
import useMissions from "@/hooks/missions"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import { RowSelectionState } from "@tanstack/react-table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { destroyMissionsService } from "@/services/missions/missions-service"
import { toast } from "sonner"
import { redirect } from "next/navigation"

/* eslint-disable react/no-unescaped-entities */
export const dynamic = 'force-dynamic'

function AlertConfirmDelete({ deletedRows, refresh }: { deletedRows: string[], refresh: () => void }) {

  async function handleRemove() {
    await destroyMissionsService(deletedRows)
    toast.success('Suppress all missions')
    refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild><Button variant="destructive" className="text-xs h-6">Delete {deletedRows.length} missions</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            You will delete {deletedRows.length} missions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemove} 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:opacity-50 disabled:pointer-events-none ring-offset-background
              bg-destructive text-destructive-foreground hover:bg-destructive/90
              h-10 px-4 py-2 
              select-none cursor-pointer"
            >Delete Forever</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function Page() {

  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({})
  const [term, setTerm] = useState("")
  const { missions, refresh } = useMissions(term)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value)
  }

  const selectedValue = Object.keys(rowSelectionState)

  function addNew() {
    redirect('/missions/form')
  }

  return (
    <div className="grid grid-rows-[auto_auto_1fr] gap-5 p-5">
      <div>
        <h1 className="text-2xl">Missions</h1>
        <div>Here's a list of your missions</div>
      </div>
      <div className="flex gap-2">
        <div className="w-full flex gap-2 justify-between">
          <div className="flex gap-4 w-fit">
            <div className="flex gap-2 items-center">
              <Label htmlFor="search-missions" className="whitespace-nowrap">Search :</Label>
              <Input onChange={handleInputChange} placeholder="C#, Java, Developer, ..." className="grow" id="search-missions" type="search" />
            </div>

            <div className="flex gap-4">
              {!!selectedValue.length && <div className="border border-gray-800 rounded py-1 px-2 flex items-center gap-2">
                <span>
                  actions
                </span>
                <div>
                  <AlertConfirmDelete refresh={refresh} deletedRows={selectedValue} />
                </div>
              </div>}
            </div>
          </div>
          
          <div className="flex">
            <Button onClick={addNew} variant="outline">New Mission</Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <DataTable selectionState={rowSelectionState} onSelectionChange={setRowSelectionState} columns={getColumnsDefinitions({ refresh })} data={missions} />
      </div>
    </div>
  )
}