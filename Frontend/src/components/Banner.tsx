import { useState } from "react"
import { untitledListColors } from "../assets/styles/untitledListColors"

const FEEDBACK_KEY = "mouse_todo_banner_feedback_given"

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
    }, 10000)
  }
  // không hiển thị nữa nếu đã phản hồi
  if (!isVisible || hasResponded) {return null}
  return (
    <div
      className="absolute right-0 bottom-0 left-0 flex items-center justify-center gap-4 px-4 py-2 text-[13px] font-medium text-white animate-in slide-in-from-bottom duration-300"
      style={{ backgroundColor: untitledListColors.bannerBg, zIndex: 50 }}
    >
      <span>Bạn thích ứng dụng của chúng tôi?</span>
      <button
        onClick={handleFeedback}
        className="rounded px-6 py-1 transition-colors"
        style={{ backgroundColor: untitledListColors.buttonHoverBg }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            untitledListColors.buttonActiveBg)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor =
            untitledListColors.buttonHoverBg)
        }
      >
        Có
      </button>
      <button
        onClick={handleFeedback}
        className="rounded px-6 py-1 transition-colors"
        style={{ backgroundColor: untitledListColors.buttonHoverBg }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            untitledListColors.buttonActiveBg)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor =
            untitledListColors.buttonHoverBg)
        }
      >
        Không hẳn
      </button>
      <button onClick={handleClose} className="absolute right-4 text-xl hover:opacity-80 transition-opacity">
        ×
      </button>
    </div>
  )
}

export default Banner
