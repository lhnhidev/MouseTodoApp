import { useState } from "react"
const FEEDBACK_KEY = "mouse_todo_banner_feedback_given"
const BANNER_DURATION = 10000 // 10 seconds

const Banner = () => {
  const [hasResponded, setHasResponded] = useState(() => {
    return sessionStorage.getItem(FEEDBACK_KEY) === "true"
  })
  const [isVisible, setIsVisible] = useState(!hasResponded)



  const handleFeedback = () => {
    setIsVisible(false)
    setHasResponded(true)
    sessionStorage.setItem(FEEDBACK_KEY, "true")
  }

  const handleClose = () => {
    setIsVisible(false)
    // 10 giây sau hiện lại nếu chọn đóng
    setTimeout(() => {
      if (!sessionStorage.getItem(FEEDBACK_KEY)) {
        setIsVisible(true)
      }
    }, BANNER_DURATION)
  }
  // không hiển thị nữa nếu đã phản hồi
  if (!isVisible || hasResponded) {return null}
  return (
    <div className="absolute right-0 bottom-0 left-0 z-50 flex animate-in slide-in-from-bottom items-center justify-center gap-4 bg-[#005fb8] px-4 py-2 text-[13px] font-medium text-white duration-300">
      <span>Bạn thích ứng dụng của chúng tôi?</span>
      <button
        onClick={handleFeedback}
        className="rounded bg-white/10 px-6 py-1 transition-colors hover:bg-white/20"
      >
        Có
      </button>
      <button
        onClick={handleFeedback}
        className="rounded bg-white/10 px-6 py-1 transition-colors hover:bg-white/20"
      >
        Không hẳn
      </button>
      <button
        onClick={handleClose}
        className="absolute right-4 text-xl transition-opacity hover:opacity-80"
      >
        ×
      </button>
    </div>
  )
}

export default Banner
