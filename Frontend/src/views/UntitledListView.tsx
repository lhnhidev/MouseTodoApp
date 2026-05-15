import { useState, type KeyboardEvent } from "react"
import {
  HiEllipsisHorizontal,
  HiOutlineShare,
  HiChevronDown
} from "react-icons/hi2"
import { TbTransitionTop } from "react-icons/tb"
import TodoItem from "../components/TodoItem"
import Banner from "@/components/Banner"

type UntitledListViewProps = {
  listName: string
}

type Todo = {
  id: number
  title: string
  isCompleted: boolean
  isImportant: boolean
}

const UntitledListView = ({ listName }: UntitledListViewProps) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
  const [newTaskTitle, setNewTaskTitle] = useState<string>("")
  const [isCompletedVisible, setIsCompletedVisible] = useState<boolean>(true)

  // Data ảo
  // TODO: Thay thế sau
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "4", isCompleted: true, isImportant: false },
    { id: 2, title: "test", isCompleted: false, isImportant: false }
  ])

  const activeTodos = todos.filter((t) => !t.isCompleted)
  const completedTodos = todos.filter((t) => t.isCompleted)

  const toggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    )
  }

  const toggleImportant = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isImportant: !t.isImportant } : t))
    )
  }

  const handleAddTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskTitle.trim()) {
      const newTodo = {
        id: Date.now(),
        title: newTaskTitle,
        isCompleted: false,
        isImportant: false
      }
      setTodos((prev) => [...prev, newTodo])
      setNewTaskTitle("")
    }
  }

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-sm bg-[#5c70be] select-none">
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
            <TbTransitionTop className="text-lg" />
          </button>
          <button className="rounded p-1.5 transition-colors hover:bg-white/10">
            <HiEllipsisHorizontal className="text-lg" />
          </button>
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-24">
        <div className="mx-auto max-w-full">
          {/* Task cần làm */}
          <div className="space-y-1.5">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                isCompleted={todo.isCompleted}
                isImportant={todo.isImportant}
                onToggleCompleted={() => toggleCompleted(todo.id)}
                onToggleImportant={() => toggleImportant(todo.id)}
              />
            ))}
          </div>

          {completedTodos.length > 0 && (
            <div className="space-y-4">
              <div className="mt-4 mb-2">
                <button
                  onClick={() => setIsCompletedVisible(!isCompletedVisible)}
                  className="flex items-center gap-2 rounded bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-white/20"
                >
                  <HiChevronDown
                    className={`text-sm transition-transform duration-200 ${!isCompletedVisible ? "-rotate-90" : ""}`}
                  />
                  Đã hoàn thành ({completedTodos.length})
                </button>
              </div>

              {/* Task làm xong */}
              {isCompletedVisible && (
                <div className="space-y-1.5">
                  {completedTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      title={todo.title}
                      isCompleted={todo.isCompleted}
                      isImportant={todo.isImportant}
                      onToggleCompleted={() => toggleCompleted(todo.id)}
                      onToggleImportant={() => toggleImportant(todo.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Thêm task */}
      <div className="absolute right-4 bottom-16 left-4">
        <div
          className={`flex items-center overflow-hidden rounded-sm bg-white shadow-lg transition-all duration-200 ${
            isInputFocused ? "shadow-none ring-2 ring-white/50" : ""
          }`}
        >
          <div className="flex items-center justify-center pr-3 pl-4 text-[22px]">
            <div className="h-5 w-5 rounded-full border-2 border-[#d1d5db]" />
          </div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleAddTodo}
            placeholder="Thêm tác vụ"
            className="flex-1 bg-transparent py-4 text-[15px] text-[#323130] outline-none"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>
      </div>

      <Banner />
    </div>
  )
}

export default UntitledListView
