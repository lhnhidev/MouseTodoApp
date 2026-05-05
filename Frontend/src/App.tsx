import { useState } from "react"
import Navigation from "./components/navigation/Navigation"

const App = () => {
  const [activeKey, setActiveKey] = useState("my-day")

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "#fff" }}>
      <Navigation 
        activeKey={activeKey} 
        onSelect={setActiveKey} 
      />
    </div>
  )
}

export default App
