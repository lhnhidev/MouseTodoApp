import { useState } from "react"
import Navigation from "./components/Navigation"
import UntitledListView from "./views/UntitledListView"
import { navigationItems } from "./components/navigation/navigation.config"
import TitleBar from "./components/TitleBar"
import Banner from "./components/Banner"

const App = () => {
  const hasElectronAPI =
    typeof window !== "undefined" && "electronAPI" in window
  const [activeKey, setActiveKey] = useState("my-day")

  const getActiveLabel = () => {
    if (activeKey === "untitled-list") {
      return "Danh sách chưa có tên"
    }
    const item = navigationItems.find((i) => i.key === activeKey)
    return item ? item.label : "Danh sách chưa có tên"
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#fff"
      }}
    >
      {hasElectronAPI ? <TitleBar /> : null}

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Navigation activeKey={activeKey} onSelect={setActiveKey} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
          {activeKey === "untitled-list" ? (
            <UntitledListView listName={getActiveLabel()} />
          ) : (
            <div className="flex flex-1 flex-col bg-white p-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {getActiveLabel()}
              </h1>
              <p className="mt-4 text-gray-500">
                Nội dung cho danh sách này đang được phát triển...
              </p>
            </div>
          )}
          <Banner />
        </div>
      </div>
    </div>
  )
}

export default App
