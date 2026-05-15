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
    icon: <SunOutlined className="text-[#7F8B92]!" />,
    count: 0
  },
  {
    key: "important",
    label: "Quan trọng",
    icon: <StarOutlined className="text-[#BC7E91]!" />,
    count: 0
  },
  {
    key: "planned",
    label: "Đã lập kế hoạch",
    icon: <CalendarOutlined className="text-[#3D8380]!" />,
    count: 0
  },
  {
    key: "assigned",
    label: "Đã giao cho tôi",
    icon: <UserOutlined className="text-[#61947E]!" />,
    count: 0
  },
  {
    key: "tasks",
    label: "Tác vụ",
    icon: <HomeOutlined className="text-[#8390C2]!" />,
    count: 0
  }
]
