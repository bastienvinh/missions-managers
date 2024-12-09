import { getUsersDal } from "@/app/dal/user-dal"
import { withAuthSuperAdmin } from "@/components/features/withAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RoleEnum } from "@/services/authentication/type"
import { ChevronDown } from "lucide-react"

export const dynamic = 'force-dynamic'

async function Page() {

  const users = await getUsersDal()

  return (
    <div className="p-4 w-full h-full flex flex-col gap-10">
      <div className="flex justify-between">
        <div className="">
          <h2>Users</h2>
          <p>A list of all the users in your account including their name, title, email and role.</p>
        </div>
        <div>
          <Button variant="secondary">Add User</Button>
        </div>
      </div>

      <div className="flex justify-center items-center grow">
        <div className="space-y-4 rounded-lg bg-slate-700 p-4">
          <h2 className="text-sm font-medium text-white">People with access</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.email} className="grid gap-5" style={{ gridTemplateColumns: "400px auto auto auto" }}>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-800 bg-transparent text-white hover:bg-gray-800 hover:text-white"
                    >
                      {user.role}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem className="cursor-pointer">Change to :{RoleEnum.ADMIN}</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Change to : {RoleEnum.REDACTOR}</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Change to : {RoleEnum.GUEST}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button>Modify</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default withAuthSuperAdmin(Page)