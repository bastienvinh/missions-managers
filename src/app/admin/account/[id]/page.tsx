import RegisterForm from "@/components/admin/register-form"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const allParams = await params;

  return (
    <div className="w-full flex justify-center mt-4">
      <RegisterForm className="w-2/4" />
    </div>
  )
}