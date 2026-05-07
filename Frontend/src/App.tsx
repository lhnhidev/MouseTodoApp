import { useState } from "react"
import Navigation from "./components/Navigation"
import TitleBar from "./components/TitleBar"

const App = () => {
  const hasElectronAPI =
    typeof window !== "undefined" && "electronAPI" in window
  const [activeKey, setActiveKey] = useState("my-day")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#fff"
      }}
    >
      {hasElectronAPI ? <TitleBar /> : null}

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Navigation activeKey={activeKey} onSelect={setActiveKey} />
        <div style={{ flex: 1, padding: "16px" }}>
          <h1 className="text-md">Ứng dụng Todo App nè</h1>
        </div>
      </div>
    </div>
  )
}

export default App
