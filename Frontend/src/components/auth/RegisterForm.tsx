import { useState } from "react"
import {
  useForm,
  Controller,
  type SubmitHandler,
  type Path
} from "react-hook-form"
import { Form, Input } from "antd"
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

interface IRegisterForm {
  username: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

const STEPS = [
  { label: "Định danh" },
  { label: "Liên lạc" },
  { label: "Bảo mật" }
]

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    watch
  } = useForm<IRegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange"
  })

  const passwordValue = watch("password")

  const next = async () => {
    let fields: Path<IRegisterForm>[] = []
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

  const prev = () => setCurrentStep((s) => s - 1)

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log("Đăng ký thành công:", data)
  }

  const inputClassName =
    "h-11 rounded-sm border-gray-200 hover:border-gray-300 focus:border-gray-900 focus:shadow-none transition-all duration-150"

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      className="w-full"
    >
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wide text-gray-900 uppercase">
            {STEPS[currentStep].label}
          </span>
          <span className="text-xs font-medium text-gray-400">
            Bước {currentStep + 1} / {STEPS.length}
          </span>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                i <= currentStep ? "bg-gray-900" : "bg-gray-100"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="min-h-fit">
        {currentStep === 0 && (
          <div className="animate-in fade-in slide-in-from-right-3 duration-200">
            <Form.Item
              label={
                <span className="text-sm font-bold text-gray-900">
                  Tên đăng nhập
                </span>
              }
              validateStatus={errors.username ? "error" : ""}
              help={
                <span className="text-xs font-medium">
                  {errors.username?.message}
                </span>
              }
              className="mb-0"
            >
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Tên đăng nhập là bắt buộc",
                  minLength: { value: 3, message: "Tối thiểu 3 ký tự" }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={
                      <MdOutlinePerson className="mr-1 text-lg text-gray-400" />
                    }
                    placeholder="Ví dụ: loc_nguyen26"
                    size="large"
                    className={inputClassName}
                  />
                )}
              />
            </Form.Item>
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-3 space-y-5 duration-200">
            <Form.Item
              label={
                <span className="text-sm font-bold text-gray-900">
                  Địa chỉ email
                </span>
              }
              validateStatus={errors.email ? "error" : ""}
              help={
                <span className="text-xs font-medium">
                  {errors.email?.message}
                </span>
              }
              className="mb-0"
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ"
                  }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={
                      <MdOutlineEmail className="mr-1 text-lg text-gray-400" />
                    }
                    placeholder="example@gmail.com"
                    size="large"
                    className={inputClassName}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-sm font-bold text-gray-900">
                  Số điện thoại{" "}
                  <span className="font-normal text-gray-400">
                    (không bắt buộc)
                  </span>
                </span>
              }
              validateStatus={errors.phoneNumber ? "error" : ""}
              help={
                <span className="text-xs font-medium">
                  {errors.phoneNumber?.message}
                </span>
              }
              className="mb-0"
            >
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  pattern: {
                    value: /^(0[3|5|7|8|9])([0-9]{8})$/,
                    message: "Số điện thoại không hợp lệ"
                  }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={
                      <MdOutlinePhone className="mr-1 text-lg text-gray-400" />
                    }
                    placeholder="0987xxxxxx"
                    size="large"
                    className={inputClassName}
                  />
                )}
              />
            </Form.Item>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-3 space-y-5 duration-200">
            <Form.Item
              label={
                <span className="text-sm font-bold text-gray-900">
                  Mật khẩu
                </span>
              }
              validateStatus={errors.password ? "error" : ""}
              help={
                <span className="text-xs font-medium">
                  {errors.password?.message}
                </span>
              }
              className="mb-0"
            >
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Mật khẩu là bắt buộc",
                  minLength: { value: 6, message: "Tối thiểu 6 ký tự" }
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={
                      <MdOutlineLock className="mr-1 text-lg text-gray-400" />
                    }
                    placeholder="Tối thiểu 6 ký tự"
                    size="large"
                    className={inputClassName}
                    visibilityToggle={{
                      visible: false
                    }}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-sm font-bold text-gray-900">
                  Xác nhận mật khẩu
                </span>
              }
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={
                <span className="text-xs font-medium">
                  {errors.confirmPassword?.message}
                </span>
              }
              className="mb-0"
            >
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Vui lòng nhập lại mật khẩu",
                  validate: (v) =>
                    v === passwordValue || "Mật khẩu xác nhận không khớp"
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={
                      <MdOutlineLock className="mr-1 text-lg text-gray-400" />
                    }
                    placeholder="Nhập lại mật khẩu"
                    size="large"
                    className={inputClassName}
                  />
                )}
              />
            </Form.Item>
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
            <ArrowLeftOutlined style={{ fontSize: 12 }} />
            Quay lại
          </button>
        )}

        <button
          type={currentStep < 2 ? "button" : "submit"}
          onClick={currentStep < 2 ? next : undefined}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-gray-900 text-sm font-bold text-white shadow-sm shadow-gray-200 transition-all hover:bg-gray-800 active:scale-[0.99]"
        >
          {currentStep < 2 ? (
            <>
              Tiếp theo <ArrowRightOutlined style={{ fontSize: 12 }} />
            </>
          ) : (
            <>
              Hoàn tất đăng ký <CheckOutlined style={{ fontSize: 12 }} />
            </>
          )}
        </button>
      </div>
    </Form>
  )
}

export default RegisterForm
