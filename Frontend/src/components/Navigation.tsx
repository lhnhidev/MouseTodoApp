import { useState } from "react"
import { Avatar, Input, Divider } from "antd"
import { Nav_colors } from "../assets/styles/Nav_colors"
import { navigationItems, NAV_ICONS } from "./navigation/navigation.config"

type User = {
  name: string
  email: string
  avatarUrl?: string
}

type NavigationProps = {
  activeKey: string
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
  const [isSearchHovered, setIsSearchHovered] = useState(false)
  const [isIconHovered, setIsIconHovered] = useState(false)

  return (
    <div
      className="flex h-screen w-[290px] flex-col border-r py-4"
      style={{
        backgroundColor: Nav_colors.navigationBg,
        borderColor: Nav_colors.border
      }}
    >
      {/* User Profile */}
      <div className="flex items-center px-4 pb-4">
        <Avatar size={48} src={user?.avatarUrl} className="mr-3" />
        <div className="flex-1 overflow-hidden">
          <div
            className="text-sm font-semibold"
            style={{ color: Nav_colors.navigationText }}
          >
            {user?.name || "Người dùng"}
          </div>
          <div
            className="flex items-center truncate text-[12px]"
            style={{ color: Nav_colors.textSecondary }}
          >
            {user?.email || "user@gmail.com"}
            <NAV_ICONS.CaretDown className="ml-1 text-[10px]" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <div
          className="relative flex w-full items-center"
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
        >
          <Input
            placeholder="Tìm kiếm"
            variant="borderless"
            className="h-8 rounded-[2px] !border-[0.1px] !border-b-[1.75px] !border-[#8a8a8a] !border-b-black pr-9 pl-[10px] text-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] transition-colors duration-100 focus:bg-white"
            style={{
              backgroundColor: isSearchHovered
                ? Nav_colors.searchHoverBg
                : Nav_colors.navigationBg
            }}
          />
          <div
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
            className="absolute top-1 right-1 bottom-[6px] flex w-7 cursor-pointer items-center justify-center rounded-[4px] transition-colors duration-200"
            style={{
              backgroundColor: isIconHovered
                ? Nav_colors.activeBg
                : "transparent"
            }}
          >
            <NAV_ICONS.Search
              style={{ color: Nav_colors.searchIcon }}
              className="text-sm"
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            aria-current={item.key === activeKey ? "page" : undefined}
            className="relative mx-2 my-[2px] flex w-[calc(100%-16px)] cursor-pointer items-center rounded-[4px] border-none px-4 py-2 text-left transition-colors duration-100 focus:outline-none"
            style={{
              backgroundColor:
                item.key === activeKey ? Nav_colors.activeBg : "transparent",
              color: Nav_colors.navigationText
            }}
            onMouseEnter={(e) => {
              if (item.key !== activeKey) {
                e.currentTarget.style.backgroundColor = Nav_colors.hoverBg
              }
            }}
            onMouseLeave={(e) => {
              if (item.key !== activeKey) {
                e.currentTarget.style.backgroundColor = "transparent"
              }
            }}
          >
            {item.key === activeKey && (
              <div
                className="absolute top-1/4 bottom-1/4 left-0 w-[3px] rounded-[2px]"
                style={{ backgroundColor: Nav_colors.activeBar }}
              />
            )}

            <span className="mr-4 flex text-[18px]">{item.icon}</span>
            <span className="flex-1 text-sm font-normal">{item.label}</span>
            {taskCounts[item.key] !== undefined && taskCounts[item.key] > 0 && (
              <span
                className="ml-2 text-[12px]"
                style={{ color: Nav_colors.textSecondary }}
              >
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
          className="relative mx-2 my-[2px] flex w-[calc(100%-16px)] cursor-pointer items-center rounded-[4px] border-none px-4 py-2 text-left transition-colors duration-100 focus:outline-none"
          style={{
            backgroundColor:
              activeKey === "untitled-list"
                ? Nav_colors.activeBg
                : "transparent",
            color: Nav_colors.navigationText
          }}
          onMouseEnter={(e) => {
            if (activeKey !== "untitled-list") {
              e.currentTarget.style.backgroundColor = Nav_colors.hoverBg
            }
          }}
          onMouseLeave={(e) => {
            if (activeKey !== "untitled-list") {
              e.currentTarget.style.backgroundColor = "transparent"
            }
          }}
        >
          {activeKey === "untitled-list" && (
            <div
              className="absolute top-1/4 bottom-1/4 left-0 w-[3px] rounded-[2px]"
              style={{ backgroundColor: Nav_colors.activeBar }}
            />
          )}

          <span className="mr-4 flex text-[18px]">
            <NAV_ICONS.UnorderedList style={{ color: Nav_colors.iconList }} />
          </span>
          <span className="flex-1 text-sm font-normal">
            Danh sách chưa có tên
          </span>
          {taskCounts["untitled-list"] !== undefined &&
            taskCounts["untitled-list"] > 0 && (
            <span
              className="ml-8 text-[12px]"
              style={{ color: Nav_colors.textSecondary }}
            >
              {taskCounts["untitled-list"]}
            </span>
          )}
        </button>
      </div>

      <div className={`px-2 flex gap-[2px] ${isElectron ? "mb-10" : ""}`}>
        <button
          type="button"
          className="flex-1 flex cursor-pointer items-center rounded-[4px] border-none bg-transparent p-[12px_8px] text-left transition-colors duration-100 focus:outline-none"
          style={{ color: Nav_colors.navigationText }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = Nav_colors.hoverBg)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <NAV_ICONS.Plus className="mr-4 text-[20px] text-[#181818]" />
          <span className="flex-1 text-[15px] font-normal">Danh sách mới</span>
        </button>
        
        {/* New group icon */}
        <button
          type="button"
          className="flex w-10 cursor-pointer items-center justify-center rounded-[4px] border-none bg-transparent transition-colors duration-100 focus:outline-none"
          style={{ color: Nav_colors.navigationText }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = Nav_colors.hoverBg)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <NAV_ICONS.RectangleGroup className="text-[18px] text-[#181818]" />
        </button>
      </div>
    </div>
  )
}

export default Navigation
