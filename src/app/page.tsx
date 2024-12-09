import withAuth from "@/components/features/withAuth"

export const dynamic = 'force-dynamic'

function Home() {
  return (
    <h1>Welcome to Missions Manager</h1>
  )
}



export default withAuth(Home)
