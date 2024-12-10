'use client'

import { UserDTO } from "@/app/dal/user-dal.utils"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteUserService } from "@/services/user-service"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"



export default function DeleteUserButton({user}: {user: UserDTO}) {
  const router = useRouter()

  function handleDeleteClick() {
    deleteUserService(user.id).then(() => {
      toast.success('User removed')
      router.refresh()
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><Trash2 /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {user.name}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClick} className="bg-red-500 hover:bg-red-400 text-white">Delete Forever</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}