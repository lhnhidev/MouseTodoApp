import { createHashRouter, Navigate } from "react-router-dom"
import RootLayout from "@/layouts/RootLayout"
import MainLayout from "@/layouts/MainLayout"
import AuthPage from "@/pages/AuthPage"

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
            element: (
              <div className="text-xl">
                TEST Nội dung trang My Day - Sẽ xóa khi triển khai
              </div>
            )
          },
          {
            path: "important",
            element: (
              <div className="text-xl">
                TEST Trang Quan trọng - Sẽ xóa khi triển khai
              </div>
            )
          }
        ]
      }
    ]
  }
])

export default router
