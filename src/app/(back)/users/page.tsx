import { getUsersDal } from "@/app/dal/user-dal"
import { withAuthAdmin } from "@/components/features/withAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pencil, Plus } from "lucide-react"
import DropdownRole from "./components/DropdownRole"
import DeleteUserButton from "./components/DeleteUserButton"
import Link from "next/link"

export const dynamic = 'force-dynamic'

async function Page() {

  const users = await getUsersDal()

  return (
    <div className="p-4 w-full h-full flex flex-col gap-10">
      <div className="flex justify-between items-center rounded bg-slate-700 p-4">
        <div>
          <h2 className="text-slate-300 text-xl font-semibold">Users</h2>
          <p>A list of all the users in your account including their name, title, email and role.</p>
        </div>
        <div>
          <Button variant="secondary"><Link href="/admin/register" className="flex items-center gap-3"><Plus />Add User</Link></Button>
        </div>
      </div>

      <div className="flex justify-center items-center grow">
        {!!users.length && <div className="space-y-4 rounded-lg bg-slate-700 p-4">
          <h2 className="text-sm font-medium text-white">People with access</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.email} className="grid gap-2" style={{ gridTemplateColumns: "400px 150px auto auto" }}>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/persona-01.png" alt={user.name ?? 'persona-01.png'} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <DropdownRole user={user} />
                <Button variant="secondary"><Link href={`/admin/account/${user.id}`}><Pencil /></Link></Button>
                <DeleteUserButton user={user} />
              </div>
            ))}
          </div>
        </div>}
      </div>
      
    </div>
  )
}

export default withAuthAdmin(Page)