import { getUserDal } from "@/app/dal/user-dal";
import RegisterForm from "@/components/admin/register-form"
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const allParams = await params;
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