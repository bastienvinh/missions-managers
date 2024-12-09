import { getUserDal } from "@/app/dal/user-dal"
import RegisterForm from "@/components/admin/register-form"
import withAuth from "@/components/features/withAuth"
import { notFound } from "next/navigation"

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const allParams = await params
  const user = await getUserDal(allParams.id)

  if (!user) {
    return notFound()
  }

  return (
    <div className="w-full flex justify-center mt-4">
      <RegisterForm className="w-2/4" user={user} />
    </div>
  )
}

export default withAuth(Page)