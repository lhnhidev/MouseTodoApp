import { app, BrowserWindow, screen, Menu, ipcMain } from "electron"
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
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  Menu.setApplicationMenu(null)

  win.on("maximize", () => win.webContents.send("window-is-maximized"))
  win.on("unmaximize", () => win.webContents.send("window-is-unmaximized"))

  if (isDev) {
    const localhostUrl = "http://localhost:5173"

    win.maximize()
    win.loadURL(localhostUrl)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"))
  }
}

app.whenReady().then(() => {
  createWindow()
  setupIPC()
})

function setupIPC() {
  ipcMain.removeAllListeners("window-minimize")
  ipcMain.removeAllListeners("window-maximize")
  ipcMain.removeAllListeners("window-close")

  ipcMain.on("window-minimize", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.minimize()
  })

  ipcMain.on("window-maximize", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return

    win.isMaximized() ? win.unmaximize() : win.maximize()
  })

  ipcMain.on("window-close", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.close()
  })
}

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
