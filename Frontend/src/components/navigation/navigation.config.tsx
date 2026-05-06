import React from "react"
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
import { Nav_colors } from "../../assets/styles/Nav_colors"

export type NavigationItemConfig = {
  key: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
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
    icon: <SunOutlined style={{ color: Nav_colors.iconSun }} />,
    count: 0
  },
  {
    key: "important",
    label: "Quan trọng",
    icon: <StarOutlined style={{ color: Nav_colors.iconStar }} />,
    count: 0
  },
  {
    key: "planned",
    label: "Đã lập kế hoạch",
    icon: <CalendarOutlined style={{ color: Nav_colors.iconPlanned }} />,
    count: 0
  },
  {
    key: "assigned",
    label: "Đã giao cho tôi",
    icon: <UserOutlined style={{ color: Nav_colors.iconAssigned }} />,
    count: 0
  },
  {
    key: "tasks",
    label: "Tác vụ",
    icon: <HomeOutlined style={{ color: Nav_colors.iconTasks }} />,
    count: 0
  }
]
