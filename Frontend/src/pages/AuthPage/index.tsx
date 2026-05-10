import { useState } from "react"
import LoginForm from "../../components/auth/LoginForm"
import RegisterForm from "../../components/auth/RegisterForm.tsx"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex h-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-9">
        <div className="mb-8 flex items-center gap-2.5">
          <img src="./Mouse-Todo-App.png" alt="" className="w-10" />
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            Mouse Todo
          </span>
        </div>

        <div className="mb-7">
          <h1 className="mb-1 text-2xl leading-snug font-semibold tracking-tight text-gray-900">
            {isLogin ? "Đăng nhập" : "Tạo tài khoản"}
          </h1>
          <p className="text-sm leading-relaxed text-gray-500">
            {isLogin
              ? "Chào mừng bạn quay trở lại."
              : "Điền thông tin để bắt đầu sử dụng."}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <p className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-gray-900 underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
