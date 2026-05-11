import { HiCheckCircle, HiOutlineStar, HiStar } from "react-icons/hi2"

type TodoItemProps = {
  title: string
  isCompleted?: boolean
  isImportant?: boolean
  onToggleCompleted?: () => void
  onToggleImportant?: () => void
}

const TodoItem = ({
  title,
  isCompleted = false,
  isImportant = false,
  onToggleCompleted,
  onToggleImportant
}: TodoItemProps) => {
  return (
    <div className="group mb-0.5 flex cursor-default items-center rounded-sm bg-white px-4 py-2.75 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-75 select-none hover:bg-gray-50 active:bg-gray-100">
      {/* Checkbox icon */}
      <div
        className="mr-4 flex shrink-0 cursor-pointer items-center justify-center text-[22px]"
        onClick={onToggleCompleted}
      >
        {isCompleted ? (
          <HiCheckCircle className="text-[#5c70be]" />
        ) : (
          <div className="h-5 w-5 rounded-full border-2 border-gray-300 transition-colors hover:border-[#5c70be]" />
        )}
      </div>

      {/* Nội dung task*/}
      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={`text-[15px] leading-tight ${isCompleted ? "text-[#797775] line-through" : "text-[#323130]"}`}
        >
          {title}
        </span>
      </div>

      {/* Star Icon */}
      <div
        className="ml-4 flex shrink-0 cursor-pointer items-center justify-center text-[18px] transition-colors"
        onClick={onToggleImportant}
      >
        {isImportant ? (
          <HiStar className="text-[#5c70be]" />
        ) : (
          <HiOutlineStar className="text-gray-300 hover:text-gray-500" />
        )}
      </div>
    </div>
  )
}

export default TodoItem
