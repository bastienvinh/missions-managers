'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "./data-table"
import { getColumnsDefinitions } from "./columns"
import useMissions, { UseMissionsOptions } from "@/hooks/missions"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from "react"
import { RowSelectionState } from "@tanstack/react-table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { destroyMissionsService } from "@/services/missions/missions-service"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import CompaniesCombobox from "./companies-combobox"
import Pagination from "./pagination"
import _ from "lodash"

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

export const dynamic = 'force-dynamic'

export default function Page() {

  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({})
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([])
  const [term, setTerm] = useState("")
  const [options, setOptions] = useState<UseMissionsOptions>({ term, page: 1, limit: 15 })
  const { missions, refresh, total } = useMissions(options)

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(15)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value)
  }

  useEffect(() => {
    setOptions({ term, page: currentPage, limit: rowsPerPage, filter: { companies: filteredCompanies } })
  }, [term, filteredCompanies, currentPage, rowsPerPage])

  const selectedValue = Object.keys(rowSelectionState)
  const totalPage = _.ceil(total / rowsPerPage, 0)

  function addNew() {
    redirect('/missions/form')
  }

  function pageChangeHandler(page: number) {
    setCurrentPage(page)
  }

  function rowsPerPagesChangeHandler(perPage: number) {
    setRowsPerPage(perPage)
  }

  return (
    <div className="p-5">
      <div className="border rounded-lg p-10 grid grid-rows-[auto_auto_1fr] gap-5">
        <div>
          <h1 className="text-2xl">Missions</h1>
          <div>Here&apos;s a list of your missions</div>
        </div>

        <div className="flex gap-2">
          <div className="w-full flex gap-2 justify-between">
            <div className="flex gap-4 w-fit">
              <div className="flex gap-2 items-center">
                <Label htmlFor="search-missions" className="whitespace-nowrap">Search :</Label>
                <Input onChange={handleInputChange} placeholder="C#, Java, Developer, ..." className="grow" id="search-missions" type="search" />
              </div>

              <div className="flex gap-4">
                <div className="border border-gray-800 rounded py-1 px-2 flex items-center gap-2">
                  <span>
                    Filterrs
                  </span>
                  <CompaniesCombobox selected={filteredCompanies} onSelectedChange={setFilteredCompanies} />
                  {!!selectedValue.length && <div>
                    <AlertConfirmDelete refresh={refresh} deletedRows={selectedValue} />
                  </div>}
                </div>
              </div>
            </div>
            
            <div className="flex">
              <Button onClick={addNew} variant="outline">New Mission</Button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <DataTable onSelectionChange={setRowSelectionState} selectionState={rowSelectionState} columns={getColumnsDefinitions({ refresh })} data={missions} />
          <Pagination onPageChange={pageChangeHandler} onRowsPerPageChange={rowsPerPagesChangeHandler} selectedRows={selectedValue.length}  currentPage={currentPage} rowsPerPage={rowsPerPage} totalRows={total} totalPages={totalPage}  />
        </div>
      </div>
    </div>
  )
}