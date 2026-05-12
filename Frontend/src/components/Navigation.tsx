/* eslint-disable indent */
import { useState } from "react"
import { Avatar, Input, Divider } from "antd"
import { navigationItems, NAV_ICONS } from "./navigation/navigation.config"

type User = {
  name: string
  email: string
  avatarUrl?: string
}

type NavigationProps = {
  activeKey: string
  // eslint-disable-next-line no-unused-vars
  onSelect: (key: string) => void
  user?: User
  taskCounts?: Record<string, number>
}

const Navigation = ({
  activeKey,
  onSelect,
  user,
  taskCounts = {}
}: NavigationProps) => {
  const isElectron = typeof window !== "undefined" && "electronAPI" in window
  const [isIconHovered, setIsIconHovered] = useState(false)

  return (
    <div className="flex h-full w-72.5 flex-col border-r border-[#edebe9] bg-white pt-4 pb-2">
      {/* người dùng */}
      <div className="flex items-center px-4 pb-4">
        <Avatar size={48} src={user?.avatarUrl} className="mr-3" />
        <div className="flex-1 overflow-hidden">
          <div className="text-sm font-semibold text-[#000000]">
            {user?.name || "Người dùng"}
          </div>
          <div className="flex items-center truncate text-[12px] text-[#605e5d]">
            {user?.email || "user@gmail.com"}
            <NAV_ICONS.CaretDown className="ml-1 text-[10px]" />
          </div>
        </div>
      </div>

      {/* thanh tìm kiếm */}
      <div className="px-4 pb-3">
        <div className="relative flex w-full items-center">
          <Input
            placeholder="Tìm kiếm"
            variant="borderless"
            className="h-8 rounded-xs border-[0.1px]! border-b-[1.75px]! border-[#8a8a8a]! border-b-black! bg-white! pr-9 pl-2.5 text-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] transition-colors duration-100 hover:bg-[#f3f2f1]! focus:bg-white!"
          />
          <div
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
            className={`absolute top-1 right-1 bottom-1.5 flex w-7 cursor-pointer items-center justify-center rounded-sm transition-colors duration-200 ${
              isIconHovered ? "bg-[#edebe9]" : "bg-transparent"
            }`}
          >
            <NAV_ICONS.Search className="text-sm text-[#1A1A1A]" />
          </div>
        </div>
      </div>

      {/* items của thanh điều hướng */}
      <div className="flex-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            aria-current={item.key === activeKey ? "page" : undefined}
            className={`relative mx-2 my-0.5 flex w-[calc(100%-16px)] cursor-pointer items-center rounded-sm border-none px-4 py-2 text-left text-black transition-colors duration-100 focus:outline-none ${
              item.key === activeKey
                ? "bg-[#edebe9]"
                : "bg-transparent hover:bg-[#f3f2f1]"
            }`}
          >
            {item.key === activeKey && (
              <div className="absolute top-1/4 bottom-1/4 left-0 w-0.75 rounded-xs bg-[#005FB8]" />
            )}

            <span className="mr-4 flex text-[18px]">{item.icon}</span>
            <span className="flex-1 text-sm font-normal">{item.label}</span>
            {taskCounts[item.key] !== undefined && taskCounts[item.key] > 0 && (
              <span className="ml-2 text-[12px] text-[#605e5d]">
                {taskCounts[item.key]}
              </span>
            )}
          </button>
        ))}

        <Divider style={{ margin: "8px 0" }} />

        <button
          key="untitled-list"
          type="button"
          onClick={() => onSelect("untitled-list")}
          aria-current={activeKey === "untitled-list" ? "page" : undefined}
          className={`relative mx-2 my-0.5 flex w-[calc(100%-16px)] cursor-pointer items-center rounded-sm border-none px-4 py-2 text-left text-black transition-colors duration-100 focus:outline-none ${
            activeKey === "untitled-list"
              ? "bg-[#edebe9]"
              : "bg-transparent hover:bg-[#f3f2f1]"
          }`}
        >
          {activeKey === "untitled-list" && (
            <div className="absolute top-1/4 bottom-1/4 left-0 w-0.75 rounded-xs bg-[#005FB8]" />
          )}

          <span className="mr-4 flex text-[18px]">
            <NAV_ICONS.UnorderedList className="text-[#5C70BE]!" />
          </span>
          <span className="flex-1 text-sm font-normal">
            Danh sách chưa có tên
          </span>
          {taskCounts["untitled-list"] !== undefined &&
            taskCounts["untitled-list"] > 0 && (
              <span className="ml-8 text-[12px] text-[#605e5d]">
                {taskCounts["untitled-list"]}
              </span>
            )}
        </button>
      </div>

      <div className={`flex gap-0.5 px-2 ${isElectron ? "mb-4" : ""}`}>
        <button
          type="button"
          className="flex flex-1 cursor-pointer items-center rounded-sm border-none bg-transparent p-[12px_8px] text-left text-black transition-colors duration-100 hover:bg-[#f3f2f1] focus:outline-none"
        >
          <NAV_ICONS.Plus className="mr-4 text-[20px] text-[#181818]" />
          <span className="flex-1 text-[15px] font-normal">Danh sách mới</span>
        </button>

        {/* danh sách mới icon */}
        <button
          type="button"
          className="flex w-10 cursor-pointer items-center justify-center rounded-sm border-none bg-transparent text-black transition-colors duration-100 hover:bg-[#f3f2f1] focus:outline-none"
        >
          <NAV_ICONS.RectangleGroup className="text-[18px] text-[#181818]" />
        </button>
      </div>
    </div>
  )
}

export default Navigation
