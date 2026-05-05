const { contextBridge, ipcRenderer } = require("electron")
// import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electronAPI", {
  nodeVersion: process.versions.node,
  chromeVersion: process.versions.chrome,
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),

  onMaximized: (callback) => {
    const listener = (_event) => callback()
    ipcRenderer.on("window-is-maximized", listener)
    return () => ipcRenderer.removeListener("window-is-maximized", listener)
  },
  onUnmaximized: (callback) => {
    const listener = (_event) => callback()
    ipcRenderer.on("window-is-unmaximized", listener)
    return () => ipcRenderer.removeListener("window-is-unmaximized", listener)
  }
})
