import type { ReactNode } from "react"
import {
  SunOutlined,
  StarOutlined,
  CalendarOutlined,
  UserOutlined,
  HomeOutlined,
  SearchOutlined,
  PlusOutlined,
  CaretDownOutlined,
  UnorderedListOutlined
} from "@ant-design/icons"
import { HiOutlineRectangleGroup } from "react-icons/hi2"
import { navColors } from "../../assets/styles/navColors"

export type NavigationItemConfig = {
  key: string
  label: string
  icon: ReactNode
  count?: number
}

export const NAV_ICONS = {
  Search: SearchOutlined,
  Plus: PlusOutlined,
  CaretDown: CaretDownOutlined,
  UnorderedList: UnorderedListOutlined,
  RectangleGroup: HiOutlineRectangleGroup
} as const

export const navigationItems: NavigationItemConfig[] = [
  {
    key: "my-day",
    label: "Ngày của Tôi",
    icon: <SunOutlined style={{ color: navColors.iconSun }} />,
    count: 0
  },
  {
    key: "important",
    label: "Quan trọng",
    icon: <StarOutlined style={{ color: navColors.iconStar }} />,
    count: 0
  },
  {
    key: "planned",
    label: "Đã lập kế hoạch",
    icon: <CalendarOutlined style={{ color: navColors.iconPlanned }} />,
    count: 0
  },
  {
    key: "assigned",
    label: "Đã giao cho tôi",
    icon: <UserOutlined style={{ color: navColors.iconAssigned }} />,
    count: 0
  },
  {
    key: "tasks",
    label: "Tác vụ",
    icon: <HomeOutlined style={{ color: navColors.iconTasks }} />,
    count: 0
  }
]
