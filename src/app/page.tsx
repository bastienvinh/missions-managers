'use server'

import withAuth from "@/components/features/withAuth"

function Home() {
  return (
    <>
      <h1>Welcome to Missions Manager</h1>
    </>
  )
}



export default withAuth(Home)
