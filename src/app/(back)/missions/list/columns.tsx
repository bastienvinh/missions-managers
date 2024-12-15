'use client'

import { MissionDal } from "@/app/dal/missions-dal"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import TechnnologiesBadgeList from "./technologies-badge-list"

function descriptionFn(mission: MissionDal) {
  return {
    description: mission.description?.slice(0, 150) + '...',
    technologies: mission.technologies
  }
}

export const columns: ColumnDef<MissionDal>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 300
  },
  {
    accessorFn: descriptionFn,
    cell({ getValue }) {
      return (
        <div className="w-full flex gap-2 items-center">
          <TechnnologiesBadgeList technologies={(getValue() as { technologies: string[] }).technologies} limit={3}  />
          <span>{(getValue() as { description: string }).description}</span>
        </div>
      )
    },
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
