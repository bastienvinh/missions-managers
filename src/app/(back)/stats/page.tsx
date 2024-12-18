import withAuth from "@/components/features/withAuth"
import TechnologyPieChart from "./components/technologies-pie-chart"

export const dynamic = 'force-dynamic'

async function Page() {
  return (
    <div className="p-5 h-full">
      <div className="border rounded-lg p-10 grid grid-rows-[auto_auto_1fr] h-full gap-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <div>Show Data visualized graphicly</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex">
            <TechnologyPieChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Page)