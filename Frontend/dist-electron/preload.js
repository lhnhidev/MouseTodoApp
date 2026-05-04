import { contextBridge, ipcRenderer } from "electron";
//#region electron/preload.js
contextBridge.exposeInMainWorld("electronAPI", {
	nodeVersion: process.versions.node,
	chromeVersion: process.versions.chrome,
	minimize: () => ipcRenderer.send("window-minimize"),
	maximize: () => ipcRenderer.send("window-maximize"),
	close: () => ipcRenderer.send("window-close"),
	onMaximized: (callback) => ipcRenderer.on("window-is-maximized", (_event) => callback()),
	onUnmaximized: (callback) => ipcRenderer.on("window-is-unmaximized", (_event) => callback())
});
//#endregion
