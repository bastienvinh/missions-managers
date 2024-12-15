import { getMissionsDal } from "@/app/dal/missions-dal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "./data-table"
import { columns } from "./columns"

/* eslint-disable react/no-unescaped-entities */
export const dynamic = 'force-dynamic'

export default async function Page() {

  const missions = await getMissionsDal()

  return (
    <div className="grid grid-rows-[auto_auto_1fr] gap-5 p-5">
      <div className="">
        <h1 className="text-2xl">Missions</h1>
        <div className="">Here's a list of your missions</div>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2">
          <Input type="search" />
          <Button variant="outline">Search</Button>
        </div>
      </div>
      <div className="w-full">
        <DataTable columns={columns} data={missions} />
      </div>
    </div>
  )
}