import { useState } from "react"
import {
  HiEllipsisHorizontal,
  HiOutlineShare,
  HiOutlineRectangleGroup,
  HiChevronDown
} from "react-icons/hi2"
import TodoItem from "../components/TodoItem"

type UntitledListViewProps = {
  listName: string
}

const UntitledListView = ({ listName }: UntitledListViewProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  // Data ảo
  // TODO: Thay thế sau
  const todos = [{ id: 1, title: "4", isCompleted: true, isImportant: false }]

  const activeTodos = todos.filter((t) => !t.isCompleted)
  const completedTodos = todos.filter((t) => t.isCompleted)

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden bg-[#5c70be] select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          {listName} ({todos.length}){/* TODO: Thay thế sau */}
        </h1>
        <div className="flex items-center gap-3 text-white">
          <button className="rounded p-1.5 transition-colors hover:bg-white/10">
            <HiOutlineShare className="text-lg" />
          </button>
          <button className="rounded p-1.5 transition-colors hover:bg-white/10">
            <HiOutlineRectangleGroup className="text-lg" />
          </button>
          <button className="rounded p-1.5 transition-colors hover:bg-white/10">
            <HiEllipsisHorizontal className="text-lg" />
          </button>
        </div>
      </div>

      {/* Nội dung */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-4 pt-2 pb-24">
        <div className="mx-auto max-w-full space-y-4">
          {/* Completed Section Toggle */}
          {completedTodos.length > 0 && (
            <div className="mb-2">
              <button className="flex items-center gap-2 rounded bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-white/20">
                <HiChevronDown className="text-sm" />
                Đã hoàn thành ({completedTodos.length})
                {/* TODO: Thay thế sau */}
              </button>
            </div>
          )}

          {/* Task cần làm */}
          <div className="space-y-0.5">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                isCompleted={todo.isCompleted}
                isImportant={todo.isImportant}
              />
            ))}
          </div>

          {/* Task làm xong */}
          <div className="space-y-0.5">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                isCompleted={todo.isCompleted}
                isImportant={todo.isImportant}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thêm task */}
      <div className="absolute right-4 bottom-16 left-4">
        <div
          className={`flex items-center overflow-hidden rounded-sm bg-white shadow-lg transition-all duration-200 ${
            isInputFocused ? "ring-2 ring-white/50" : ""
          }`}
        >
          <div className="flex items-center justify-center pr-3 pl-4 text-[22px] text-gray-400">
            <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
          </div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Thêm tác vụ"
            className="flex-1 bg-transparent py-4 text-[15px] outline-none placeholder:text-gray-500"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>
      </div>

      {/* Ý kiến */}
      <div className="absolute right-0 bottom-0 left-0 flex items-center justify-center gap-4 bg-[#005fb8] px-4 py-2 text-[13px] font-medium text-white">
        <span>Bạn thích ứng dụng của chúng tôi?</span>
        <button className="rounded bg-white/20 px-6 py-1 transition-colors hover:bg-white/30">
          Có
        </button>
        <button className="rounded bg-white/20 px-6 py-1 transition-colors hover:bg-white/30">
          Không hẳn
        </button>
        <button className="absolute right-4 text-xl">×</button>
      </div>
    </div>
  )
}

export default UntitledListView
