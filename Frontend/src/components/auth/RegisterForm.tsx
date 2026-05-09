import { useState } from "react"
import {
  useForm,
  Controller,
  type SubmitHandler,
  type Path
} from "react-hook-form"
import { Form, Input, Button, Steps } from "antd"
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
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

  const password = watch("password")

  const next = async () => {
    let fieldsToValidate: Path<IRegisterForm>[] = []

    if (currentStep === 0) {
      fieldsToValidate = ["username"]
    }
    if (currentStep === 1) {
      fieldsToValidate = ["email", "phoneNumber"]
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prev = () => setCurrentStep(currentStep - 1)

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log("Đăng ký thành công:", data)
  }

  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <Steps
        current={currentStep}
        size="small"
        className="mb-4! hidden sm:flex"
        items={[
          { title: "Định danh" },
          { title: "Liên lạc" },
          { title: "Bảo mật" }
        ]}
      />

      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="mt-4"
      >
        {currentStep === 0 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <Form.Item
              label={
                <span className="font-semibold text-slate-700">
                  Tên đăng nhập
                </span>
              }
              validateStatus={errors.username ? "error" : ""}
              help={errors.username?.message}
            >
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Tên đăng nhập không được để trống",
                  minLength: { value: 3, message: "Tối thiểu 3 ký tự" }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<UserOutlined className="text-slate-400" />}
                    placeholder="Ví dụ: loc_nguyen26"
                    size="large"
                    className="h-12 rounded-lg"
                  />
                )}
              />
            </Form.Item>
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <Form.Item
              label={
                <span className="font-semibold text-slate-700">
                  Địa chỉ Email
                </span>
              }
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
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
                    prefix={<MailOutlined className="text-slate-400" />}
                    placeholder="example@gmail.com"
                    size="large"
                    className="h-12 rounded-lg"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-semibold text-slate-700">
                  Số điện thoại
                </span>
              }
              validateStatus={errors.phoneNumber ? "error" : ""}
              help={errors.phoneNumber?.message}
            >
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  pattern: {
                    value: /^(0[3|5|7|8|9])([0-9]{8})$/,
                    message: "Số điện thoại Việt Nam không hợp lệ"
                  }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<PhoneOutlined className="text-slate-400" />}
                    placeholder="0987xxxxxx"
                    size="large"
                    className="h-12 rounded-lg"
                  />
                )}
              />
            </Form.Item>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <Form.Item
              label={
                <span className="font-semibold text-slate-700">Mật khẩu</span>
              }
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
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
                    prefix={<LockOutlined className="text-slate-400" />}
                    placeholder="••••••"
                    size="large"
                    className="h-12 rounded-lg"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-semibold text-slate-700">
                  Xác nhận mật khẩu
                </span>
              }
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword?.message}
            >
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Vui lòng nhập lại mật khẩu",
                  validate: (v) =>
                    v === password || "Mật khẩu xác nhận không khớp"
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined className="text-slate-400" />}
                    placeholder="••••••"
                    size="large"
                    className="h-12 rounded-lg"
                  />
                )}
              />
            </Form.Item>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {currentStep > 0 && (
            <Button
              onClick={prev}
              size="large"
              icon={<ArrowLeftOutlined />}
              className="order-2 h-12 w-full rounded-lg sm:order-1 sm:w-1/3"
            >
              Quay lại
            </Button>
          )}

          {currentStep < 2 ? (
            <Button
              type="primary"
              onClick={next}
              size="large"
              className="order-1 flex h-12 w-full flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 sm:order-2"
            >
              Tiếp theo <ArrowRightOutlined />
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="order-1 flex h-12 w-full flex-1 items-center justify-center gap-2 rounded-lg border-none bg-green-600 shadow-md shadow-green-100 hover:bg-green-700 sm:order-2"
            >
              Hoàn tất đăng ký <CheckOutlined />
            </Button>
          )}
        </div>
      </Form>
    </div>
  )
}

export default RegisterForm
