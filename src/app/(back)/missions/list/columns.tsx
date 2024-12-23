'use client'

import { MissionDTO } from "@/app/dal/missions-dal"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Banknote, BriefcaseBusiness, Building2, ClipboardCopy, MoreHorizontal, Pencil, SquareMenu, Trash2 } from "lucide-react"
// import TechnnologiesBadgeList from "./technologies-badge-list"
import { destroyMissionsService } from "@/services/missions/missions-service"
import { toast } from "sonner"
import DetailMission from "./detail-mission"
import { Badge } from "@/components/ui/badge"
import TechnnologiesBadgeList from "./technologies-badge-list"
import { redirect } from "next/navigation"

function descriptionFn(mission: MissionDTO) {
  return mission.description?.slice(0, 150) + '...'
}

async function deleteMission(id: string) {
  await destroyMissionsService([id])
  toast.success('Success deleted mission')
}

export function getColumnsDefinitions({ refresh }: { refresh: () => void }): ColumnDef<MissionDTO>[] {

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
      cell({ getValue, row }) {
        return (
          <div className="w-full flex gap-2 items-center">
            <Badge className="h-6">{row.original.type}</Badge>
            <TechnnologiesBadgeList technologies={row.original.technologies} />
            <span>{getValue() as string}</span>
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
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex gap-1 cursor-pointer" onClick={() => navigator.clipboard.writeText(row.original.sourceUrl ?? '')}><ClipboardCopy /> Copy Url</DropdownMenuItem>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <DetailMission mission={row.original} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => redirect(`/missions/${row.original.id}/modify`)} className="flex gap-1 cursor-pointer"><Pencil /> Modify</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(row.original.id)} className="text-red-500 flex gap-1 cursor-pointer"><Trash2 /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
