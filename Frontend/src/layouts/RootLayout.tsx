import { Outlet } from "react-router-dom"
import TitleBar from "@/components/TitleBar"

const RootLayout = () => {
  const hasElectronAPI =
    typeof window !== "undefined" && "electronAPI" in window

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-(--light-theme-bg)">
      {hasElectronAPI && <TitleBar />}

      <div className="relative flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
