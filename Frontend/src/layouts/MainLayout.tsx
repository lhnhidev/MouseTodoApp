import { Outlet } from "react-router-dom"
import { useState } from "react"
import Navigation from "@/components/Navigation"

const MainLayout = () => {
  const [activeKey, setActiveKey] = useState("my-day")

  return (
    <div className="flex h-full w-full overflow-hidden">
      <Navigation activeKey={activeKey} onSelect={setActiveKey} />

      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
