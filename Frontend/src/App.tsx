import TitleBar from "./components/TitleBar"

const App = () => {
  const hasElectronAPI =
    typeof window !== "undefined" && "electronAPI" in window

  return (
    <div>
      {hasElectronAPI ? <TitleBar /> : null}
      <h1 className="text-md">Ứng dụng Todo App nè</h1>
    </div>
  )
}

export default App
