import { RouterProvider } from "react-router-dom"
import router from "./routers"
import { App as AntApp } from "antd"

const App = () => {
  return (
    <AntApp>
      <RouterProvider router={router} />
    </AntApp>
  )
}

export default App
