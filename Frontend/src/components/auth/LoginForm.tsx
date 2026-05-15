import { type KeyboardEvent } from "react"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { Form, Input, Checkbox, message } from "antd"
import { MdOutlineLock, MdOutlinePerson } from "react-icons/md"
import { ArrowRightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import type { TLoginForm } from "@/types/TLoginForm.ts"

const LoginForm = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, setError } = useForm<TLoginForm>({
    defaultValues: {
      username: "",
      password: "",
      remember: true
    },
    mode: "onChange"
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    try {
      // giả lập API bỏ sau
      if (data.username === "error") {
        message.error("Tài khoản hoặc mật khẩu không chính xác")
        setError("username", {
          type: "manual",
          message: "Tài khoản không tồn tại"
        })
        return
      }

      message.success("Đăng nhập thành công!")
      navigate("/main/my-day")
    } catch (error) {
      message.error((error as Error).message)
    }
  }

  const inputClassName = "h-11 rounded-sm "

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      className="w-full"
    >
      <div className="space-y-5">
        <Controller
          name="username"
          control={control}
          rules={{
            required: "Tên đăng nhập là bắt buộc",
            minLength: { value: 3, message: "Tối thiểu 3 ký tự" }
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label={
                <span className="text-sm font-bold text-(--text-primary-color)">
                  Tên đăng nhập
                </span>
              }
              validateStatus={error ? "error" : ""}
              help={error?.message}
              className="mb-0"
            >
              <Input
                {...field}
                prefix={
                  <MdOutlinePerson className="mr-1 text-lg text-(--text-secondary-color)" />
                }
                placeholder="Ví dụ: username001"
                className={inputClassName}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Mật khẩu là bắt buộc",
            minLength: { value: 6, message: "Tối thiểu 6 ký tự" }
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label={
                <span className="text-sm font-bold text-(--text-primary-color)">
                  Mật khẩu
                </span>
              }
              validateStatus={error ? "error" : ""}
              help={error?.message}
              className="mb-0"
            >
              <Input.Password
                {...field}
                prefix={
                  <MdOutlineLock className="mr-1 text-lg text-(--text-secondary-color)" />
                }
                placeholder="Nhập mật khẩu của bạn"
                className={inputClassName}
              />
            </Form.Item>
          )}
        />

        <div className="flex items-center justify-between">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox
                name={field.name}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                className="text-xs font-medium text-(--text-secondary-color)"
              >
                Ghi nhớ đăng nhập
              </Checkbox>
            )}
          />
          <button
            type="button"
            className="text-xs font-semibold text-(--text-primary-color) hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-gray-900 text-sm font-bold text-white shadow-sm shadow-gray-200 transition-all hover:bg-gray-800 active:scale-[0.99]"
      >
        Đăng nhập <ArrowRightOutlined className="text-xs" />
      </button>
    </Form>
  )
}

export default LoginForm
