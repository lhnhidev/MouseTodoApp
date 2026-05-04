import electron, { BrowserWindow, Menu, app, ipcMain, screen } from "electron";
import * as path from "path";
import { fileURLToPath } from "url";
//#region node_modules/electron-is-dev/index.js
if (typeof electron === "string") throw new TypeError("Not running in an Electron environment!");
var { env } = process;
var isEnvSet = "ELECTRON_IS_DEV" in env;
var getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV, 10) === 1;
var isDev = isEnvSet ? getFromEnv : !electron.app.isPackaged;
//#endregion
//#region electron/main.js
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var createWindow = () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const win = new BrowserWindow({
		width,
		height,
		x: 0,
		y: 0,
		frame: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true
		}
	});
	Menu.setApplicationMenu(null);
	ipcMain.on("window-minimize", () => win.minimize());
	ipcMain.on("window-maximize", () => {
		if (win.isMaximized()) win.unmaximize();
		else win.maximize();
	});
	ipcMain.on("window-close", () => win.close());
	win.on("maximize", () => win.webContents.send("window-is-maximized"));
	win.on("unmaximize", () => win.webContents.send("window-is-unmaximized"));
	if (isDev) {
		const localhostUrl = "http://localhost:5173";
		win.maximize();
		win.loadURL(localhostUrl);
		win.webContents.openDevTools();
	} else win.loadFile(path.join(__dirname, "../dist/index.html"));
};
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
//#endregion
