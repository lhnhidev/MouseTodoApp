import React, { useState } from "react"
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

const Navigation: React.FC<NavigationProps> = ({
  activeKey,
  onSelect,
  user,
  taskCounts = {}
}) => {
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
            className="h-8 rounded-[2px] !border-[0.1px] !border-b-[1.75px] !border-[#8a8a8a] !border-b-black pr-9 pl-[10px] text-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] transition-colors duration-100 hover:bg-[#f3f2f1] focus:bg-white"
            style={{
              backgroundColor: isSearchHovered ? "#f3f2f1" : "#ffffff"
            }}
          />
          <div
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
            className={`absolute top-1 right-1 bottom-[6px] flex w-7 cursor-pointer items-center justify-center rounded-[4px] transition-colors duration-200 ${
              isIconHovered ? "bg-[#edebe9]" : "bg-transparent"
            }`}
          >
            <NAV_ICONS.Search className="text-sm text-[#1A1A1A]" />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <div
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="relative mx-2 my-[2px] flex cursor-pointer items-center rounded-[4px] px-4 py-2 transition-colors duration-100"
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
            <span className="flex-1 text-sm">{item.label}</span>
            {taskCounts[item.key] !== undefined && taskCounts[item.key] > 0 && (
              <span
                className="ml-2 text-[12px]"
                style={{ color: Nav_colors.textSecondary }}
              >
                {taskCounts[item.key]}
              </span>
            )}
          </div>
        ))}

        <Divider style={{ margin: "8px 0" }} />

        <div
          key="untitled-list"
          onClick={() => onSelect("untitled-list")}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            margin: "2px 8px",
            borderRadius: 4,
            cursor: "pointer",
            transition: "background-color 0.1s",
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
              style={{
                position: "absolute",
                left: 0,
                top: "25%",
                bottom: "25%",
                width: 3,
                backgroundColor: Nav_colors.activeBar,
                borderRadius: 2
              }}
            />
          )}

          <span style={{ fontSize: 18, marginRight: 16, display: "flex" }}>
            <NAV_ICONS.UnorderedList style={{ color: Nav_colors.iconList }} />
          </span>
          <span style={{ flex: 1, fontSize: 14 }}>Danh sách chưa có tên</span>
          {taskCounts["untitled-list"] !== undefined &&
            taskCounts["untitled-list"] > 0 && (
            <span
              style={{
                fontSize: 12,
                color: Nav_colors.textSecondary,
                marginLeft: 8
              }}
            >
              {taskCounts["untitled-list"]}
            </span>
          )}
        </div>
      </div>

      <div className={`px-2 ${isElectron ? "mb-10" : ""}`}>
        <div
          className="flex cursor-pointer items-center rounded-[4px] p-[12px_8px] transition-colors duration-100"
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
          <NAV_ICONS.RectangleGroup className="text-[18px] text-[#181818]" />
        </div>
      </div>
    </div>
  )
}

export default Navigation
