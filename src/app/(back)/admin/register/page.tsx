import RegisterForm from "@/components/admin/register-form"
import withAuth from "@/components/features/withAuth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Undo2 } from "lucide-react"

export const dynamic = 'force-dynamic'

function Page() {

  return (
    <div className="w-full flex justify-center flex-col gap-5 mt-4">
      <div className="flex justify-start p-7"><Button variant="outline"><Link href="/users" className="flex gap-2"><Undo2 />Back</Link></Button></div>
      <div className="w-full flex justify-center">
        <RegisterForm className="w-2/4" />
      </div>
    </div>
  )
}

export default withAuth(Page)