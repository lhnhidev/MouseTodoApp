export interface IElectronAPI {
  minimize: () => void
  maximize: () => void
  close: () => void
  onMaximized: (callback: () => void) => void
  onUnmaximized: (callback: () => void) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
