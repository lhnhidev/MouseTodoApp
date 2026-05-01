import { contextBridge } from "electron"

contextBridge.exposeInMainWorld("electronAPI", {
  nodeVersion: process.versions.node,
  chromeVersion: process.versions.chrome
})
