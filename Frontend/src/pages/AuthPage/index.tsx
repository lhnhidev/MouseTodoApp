import { useState } from "react"
import { Card } from "antd"
import LoginForm from "../../components/auth/LoginForm"
import RegisterForm from "../../components/auth/RegisterForm.tsx"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex h-full items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <div className="mb-6 space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <img src="./Mouse-Todo-App.png" alt="" className="w-10" />
            <h1 className="text-xl font-semibold">Mouse Todo</h1>
          </div>
          <p className="text-lg">
            {isLogin ? "Chào mừng bạn quay trở lại" : "Tạo tài khoản mới"}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-6 text-center">
          <p>
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
            <span
              className="cursor-pointer font-bold text-blue-500 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </span>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default AuthPage
