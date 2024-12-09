import RegisterForm from "@/components/admin/register-form"
import withAuth from "@/components/features/withAuth"

function Page() {

  return (
    <div className="w-full flex justify-center mt-4">
      <RegisterForm className="w-2/4" />
    </div>
  )
}

export default withAuth(Page)