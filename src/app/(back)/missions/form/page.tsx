import MissionsForm from "@/components/back/mission-form"
import withAuth from "@/components/features/withAuth"

export const dynamic = 'force-dynamic'

function Page() {
  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-mono font-bold">Mission/Job</h1>
        <div className="text-zinc-500 font-mono">Add new job description to the database to analyze it.</div>
      </div>

      <div className="border border-b h-0 border-zinc-400 w-2/3"></div>

      <div className="w-full flex grow">
        <div className="w-1/2">
          <MissionsForm />
        </div>
      </div>
    </div>
  )
}


export default withAuth(Page)