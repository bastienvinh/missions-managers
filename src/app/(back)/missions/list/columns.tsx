'use client'

import { MissionDal } from "@/app/dal/missions-dal"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

function descriptionFn(mission: MissionDal) {
  return mission.description?.slice(0, 150) + '...'
}

export const columns: ColumnDef<MissionDal>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 300
  },
  {
    accessorFn: descriptionFn,
    header: "Description",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "salary",
    header: "Salary"
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Modify</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
