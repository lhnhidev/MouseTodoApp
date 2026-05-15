import { createHashRouter, Navigate } from "react-router-dom"
import RootLayout from "@/layouts/RootLayout"
import MainLayout from "@/layouts/MainLayout"
import AuthPage from "@/pages/AuthPage"
import UntitledListView from "@/views/UntitledListView"

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="auth" replace />
      },
      {
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "main",
        element: <MainLayout />,
        children: [
          {
            path: "my-day",
            element: <UntitledListView listName="Ngày của tôi" />
          },
          {
            path: "important",
            element: <UntitledListView listName="Quan trọng" />
          },
          {
            path: "untitled-list",
            element: <UntitledListView listName="Danh sách chưa có tên" />
          }
        ]
      }
    ]
  }
])

export default router
