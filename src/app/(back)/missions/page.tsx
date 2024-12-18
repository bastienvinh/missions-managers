import ExpiresCard from "./components/expires-card"
import ExpiresTodayCard from "./components/expires-today-card"
import MissionsNumbersCard from "./components/missions-numbers-card"

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="p-5 h-full">
      <div className="border rounded-lg p-10 grid grid-rows-[auto_auto_1fr] h-full gap-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div>All your top informatio here</div>
        </div>

        {/* Contains list of card with some informations */}
        <div className="grid grid-cols-4 gap-4">
          <MissionsNumbersCard />
          <ExpiresCard />
          <ExpiresTodayCard />
          <MissionsNumbersCard />
        </div>
      </div>
    </div>
  )
}