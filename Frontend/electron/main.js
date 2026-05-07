import {
  app,
  BrowserWindow,
  screen,
  Menu,
  ipcMain,
  globalShortcut
} from "electron"
import * as path from "path"
import isDev from "electron-is-dev"

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Hàm tạo Window cho app
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

  setupShortcut(win)
}

// Hàm đăng ký sự kiện cho Window
const setupIPC = () => {
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

// Hàm đăng ký phím tắt
const setupShortcut = (win) => {
  // Đăng ký phím tắt Ctrl + Shift + R
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    win.reload()
  })

  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win.openDevTools()
  })

  // if (!ret) {
  //   console.log("Đăng ký phím tắt thất bại")
  // }
}

app.whenReady().then(() => {
  createWindow()
  setupIPC()
})

// Một số sự kiện bên lề của ứng dụng
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
