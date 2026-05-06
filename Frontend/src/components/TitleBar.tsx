import { useState, useEffect, type CSSProperties } from "react"
import { FaRegSquare, FaRegWindowMinimize, FaRegCopy } from "react-icons/fa6"
import { IoCloseOutline } from "react-icons/io5"

const getIsWindowMaximized = () => {
  return (
    window.outerWidth >= window.screen.availWidth &&
    window.outerHeight >= window.screen.availHeight
  )
}

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(() => getIsWindowMaximized())

  useEffect(() => {
    const unsubscribeMaximized = window.electronAPI.onMaximized(() =>
      setIsMaximized(true)
    )
    const unsubscribeUnmaximized = window.electronAPI.onUnmaximized(() =>
      setIsMaximized(false)
    )
    return () => {
      unsubscribeMaximized()
      unsubscribeUnmaximized()
    }
  }, [])

  return (
    <div className="flex h-9 w-full items-center justify-between border-b border-white/5 bg-(--light-theme-bg) text-[#191919] select-none dark:bg-(--dark-theme-bg) dark:text-white">
      <div
        className="flex h-full flex-1 items-center px-4"
        style={{ WebkitAppRegion: "drag" } as CSSProperties}
      >
        <img src="/Mouse-Todo-App.png" alt="Logo" className="mr-2 h-4 w-4" />
        <span className="text-xs font-normal tracking-tight">
          Mouse Todo App
        </span>
      </div>

      <div
        className="flex h-full items-center"
        style={{ WebkitAppRegion: "no-drag" } as CSSProperties}
      >
        <button
          title="Minimize"
          onClick={() => window.electronAPI.minimize()}
          className="flex h-full w-11 items-center justify-center transition-colors hover:bg-[#2d2d2d] hover:text-white"
        >
          <FaRegWindowMinimize className="-translate-y-1 text-xs" />
        </button>

        <button
          title={isMaximized ? "Restore Down" : "Maximize"}
          onClick={() => {
            window.electronAPI.maximize()
          }}
          className="flex h-full w-11 items-center justify-center transition-colors hover:bg-[#2d2d2d] hover:text-white"
        >
          {isMaximized ? (
            <FaRegCopy className="-rotate-90 text-xs" />
          ) : (
            <FaRegSquare className="text-xs" />
          )}
        </button>

        <button
          title="Close"
          onClick={() => window.electronAPI.close()}
          className="flex h-full w-11 items-center justify-center transition-colors hover:bg-[#c42b1c] hover:text-white"
        >
          <IoCloseOutline className="text-xl" />
        </button>
      </div>
    </div>
  )
}

export default TitleBar
