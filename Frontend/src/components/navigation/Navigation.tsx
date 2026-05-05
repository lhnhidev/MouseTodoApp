import React from "react"
import { Avatar, Input, Divider } from "antd"
import { Nav_colors } from "../../assets/styles/Nav_colors"
import { navigationItems, NAV_ICONS } from "./navigation.config"

interface User {
  name: string
  email: string
  avatarUrl?: string
}

interface NavigationProps {
  activeKey: string
  onSelect: (key: string) => void
  user?: User
  taskCounts?: Record<string, number>
}

const Navigation: React.FC<NavigationProps> = ({ activeKey, onSelect, user, taskCounts = {} }) => {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [isSearchHovered, setIsSearchHovered] = React.useState(false)
  const [isIconHovered, setIsIconHovered] = React.useState(false)

  return (
    <div
      className="w-[290px] h-screen flex flex-col py-4 border-r"
      style={{
        backgroundColor: Nav_colors.navigationBg,
        borderColor: Nav_colors.border
      }}
    >
      {/* User Profile */}
      <div
        className="px-4 pb-4 flex items-center"
      >
        <Avatar
          size={48}
          src={user?.avatarUrl}
          className="mr-3"
        />
        <div className="flex-1 overflow-hidden">
          <div
            className="font-semibold text-sm"
            style={{ color: Nav_colors.navigationText }}
          >
            {user?.name || "Người dùng"}
          </div>
          <div
            className="text-[12px] truncate flex items-center"
            style={{ color: Nav_colors.textSecondary }}
          >
            {user?.email || "user@gmail.com"}
            <NAV_ICONS.CaretDown className="text-[10px] ml-1" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <div
          className="relative flex items-center w-full"
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
        >
          <Input
            placeholder="Tìm kiếm"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="rounded-[4px] border border-[#d1d1d1] border-b-2 border-b-black h-8 pl-[10px] pr-9 text-sm transition-colors duration-100 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)]"
            style={{
              backgroundColor: isSearchHovered ? "#f3f2f1" : "#ffffff",
            }}
          />
          <div
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
            className={`absolute right-1 top-1 bottom-[6px] w-7 flex items-center justify-center rounded-[4px] cursor-pointer transition-colors duration-200 ${
              isIconHovered ? "bg-[#edebe9]" : "bg-transparent"
            }`}
          >
            <NAV_ICONS.Search className="text-[#1A1A1A] text-sm" />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <div
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="relative flex items-center py-2 px-4 my-[2px] mx-2 rounded-[4px] cursor-pointer transition-colors duration-100"
            style={{
              backgroundColor: item.key === activeKey ? Nav_colors.activeBg : "transparent",
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
                className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-[2px]"
                style={{ backgroundColor: Nav_colors.activeBar }}
              />
            )}

            <span className="text-[18px] mr-4 flex">
              {item.icon}
            </span>
            <span className="flex-1 text-sm">{item.label}</span>
            {taskCounts[item.key] !== undefined && taskCounts[item.key] > 0 && (
              <span
                className="text-[12px] ml-2"
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

      <div className="px-2">
        <div
          className="flex items-center p-[12px_8px] cursor-pointer rounded-[4px] transition-colors duration-100"
          style={{ color: Nav_colors.navigationText }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = Nav_colors.hoverBg)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <NAV_ICONS.Plus className="text-[20px] mr-4 text-[#181818]" />
          <span className="flex-1 text-[15px] font-normal">
            Danh sách mới
          </span>
          <NAV_ICONS.RectangleGroup className="text-[18px] text-[#181818]" />
        </div>
      </div>
    </div>
  )
}

export default Navigation
