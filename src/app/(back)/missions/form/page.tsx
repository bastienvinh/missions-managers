import withAuth from "@/components/features/withAuth"

export const dynamic = 'force-dynamic'

function Page() {
  return (
    <div className="w-full p-5">
      <div>
        <h1 className="text-xl">Mission/Job</h1>
        <div className=""></div>
      </div>
    </div>
  )
}


export default withAuth(Page)