'use client'

import { MissionDal } from "@/app/dal/missions-dal"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Banknote, BriefcaseBusiness, Building2, MoreHorizontal, SquareMenu } from "lucide-react"
import TechnnologiesBadgeList from "./technologies-badge-list"
import { destroyMissionsService } from "@/services/missions/missions-service"
import { toast } from "sonner"

function descriptionFn(mission: MissionDal) {
  return {
    description: mission.description?.slice(0, 150) + '...',
    technologies: mission.technologies
  }
}

async function deleteMission(id: string) {
  await destroyMissionsService([id])
  toast.success('Success deleted mission')
}

export function getColumnsDefinitions({ refresh }: { refresh: () => void }): ColumnDef<MissionDal>[] {

  async function handleDelete(id: string) {
    await deleteMission(id)
    refresh()
  }

  return [
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
      header: () => <div className="flex gap-2 items-center"><BriefcaseBusiness />Title</div>,
      minSize: 500
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
      header: () => (<div className="flex gap-2 items-center justify-center"><Building2 /> Company</div>),
    },
    {
      accessorKey: "salary",
      header: () => (<div className="flex gap-2 items-center justify-center"><Banknote />Salary</div>)
    },
    {
      id: 'actions',
      header: () => (<div className="flex justify-center"><SquareMenu /></div>),
      cell: ({ row }) => {
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
              <DropdownMenuItem onClick={() => handleDelete(row.original.id)} className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
