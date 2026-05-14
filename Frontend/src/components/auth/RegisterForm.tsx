import { useState, type KeyboardEvent } from "react"
import {
  useForm,
  Controller,
  type SubmitHandler,
  type Path
} from "react-hook-form"
import { Form, Input, message } from "antd"
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLock,
  MdOutlinePerson
} from "react-icons/md"
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckOutlined
} from "@ant-design/icons"
import Stepper from "../commons/Stepper.tsx"
import type { TRegisterForm } from "@/types/TRegisterForm.ts"
import { STEPS } from "@/consts/step.ts"

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const { control, handleSubmit, trigger, getValues } = useForm<TRegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange"
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (currentStep < STEPS.length - 1) {
        next()
      } else {
        handleSubmit(onSubmit)()
      }
    }
  }

  const next = async () => {
    let fields: Path<TRegisterForm>[] = []
    if (currentStep === 0) {
      fields = ["username"]
    }
    if (currentStep === 1) {
      fields = ["email", "phoneNumber"]
    }

    const isValid = await trigger(fields)
    if (isValid) {
      setCurrentStep((s) => s + 1)
    }
  }

  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0))

  const onSubmit: SubmitHandler<TRegisterForm> = () => {
    message.success("Đăng ký thành công")
  }

  const inputClassName = "h-11 rounded-sm "

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      className="w-full"
    >
      <Stepper steps={STEPS} currentStep={currentStep} />

      <div className="mt-6">
        {currentStep === 0 && (
          <div className="animate-in fade-in slide-in-from-right-3 duration-200">
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
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-3 space-y-5 duration-200">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email là bắt buộc",
                pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label={
                    <span className="text-sm font-bold text-(--text-primary-color)">
                      Địa chỉ email
                    </span>
                  }
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                  className="mb-0"
                >
                  <Input
                    {...field}
                    prefix={
                      <MdOutlineEmail className="mr-1 text-lg text-(--text-secondary-color)" />
                    }
                    placeholder="example@gmail.com"
                    className={inputClassName}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^(0[35789])([0-9]{8})$/,
                  message: "Số điện thoại không hợp lệ"
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label={
                    <span className="text-sm font-bold text-(--text-primary-color)">
                      Số điện thoại
                    </span>
                  }
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                  className="mb-0"
                >
                  <Input
                    {...field}
                    prefix={
                      <MdOutlinePhone className="mr-1 text-lg text-(--text-secondary-color)" />
                    }
                    placeholder="0987xxxxxx"
                    className={inputClassName}
                  />
                </Form.Item>
              )}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-3 space-y-5 duration-200">
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
                    placeholder="Tối thiểu 6 ký tự"
                    className={inputClassName}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger("confirmPassword")
                    }}
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Vui lòng nhập lại mật khẩu",
                validate: (value) =>
                  value === getValues("password") ||
                  "Mật khẩu xác nhận không khớp"
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label={
                    <span className="text-sm font-bold text-(--text-primary-color)">
                      Xác nhận mật khẩu
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
                    placeholder="Nhập lại mật khẩu"
                    className={inputClassName}
                  />
                </Form.Item>
              )}
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-2">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={prev}
            className="flex h-11 shrink-0 items-center gap-2 rounded-sm border border-gray-200 px-5 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
          >
            <ArrowLeftOutlined className="text-xs" /> Quay lại
          </button>
        )}
        <button
          type={currentStep < 2 ? "button" : "submit"}
          onClick={currentStep < 2 ? next : undefined}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-gray-900 text-sm font-bold text-white shadow-sm shadow-gray-200 transition-all hover:bg-gray-800 active:scale-[0.99]"
        >
          {currentStep < 2 ? (
            <>
              Tiếp theo <ArrowRightOutlined className="text-xs" />
            </>
          ) : (
            <>
              Hoàn tất đăng ký <CheckOutlined className="text-xs" />
            </>
          )}
        </button>
      </div>
    </Form>
  )
}

export default RegisterForm
