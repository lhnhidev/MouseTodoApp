import { app, BrowserWindow, screen } from "electron"
import * as path from "path"
import isDev from "electron-is-dev"

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const win = new BrowserWindow({
    width,
    height,
    x: 0, // Đặt cửa sổ ở góc trên cùng bên trái
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  if (isDev) {
    const localhostUrl = "http://localhost:5173"

    if (!localhostUrl) {
      throw new Error("LOCALHOST is not defined in the Frontend .env file")
    }

    win.maximize()
    win.loadURL(localhostUrl)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"))
  }
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
