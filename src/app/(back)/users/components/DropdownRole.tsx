'use client'

import { UserDTO } from "@/app/dal/user-dal.utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RoleEnum } from "@/services/authentication/type"
import { setRoleService } from "@/services/user-service"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function DropdownRole({ user }: { user: UserDTO }) {
  const [role, setRole] = useState(user.role)

  useEffect(() => {
    setRoleService(user.id, role as RoleEnum).then(() => {
      toast.success('Role has changed')
    })
  }, [user, role])
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-between border-gray-800 bg-transparent text-white hover:bg-gray-800 hover:text-white"
        >
          {role}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuItem onClick={() => setRole(RoleEnum.ADMIN)} className="cursor-pointer">{RoleEnum.ADMIN}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole(RoleEnum.REDACTOR)} className="cursor-pointer">{RoleEnum.REDACTOR}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole(RoleEnum.GUEST)} className="cursor-pointer">{RoleEnum.GUEST}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}