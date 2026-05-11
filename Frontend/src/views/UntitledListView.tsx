import { useState, type CSSProperties, type KeyboardEvent } from "react"
import {
  HiEllipsisHorizontal,
  HiOutlineShare,
  HiChevronDown
} from "react-icons/hi2"
import { TbTransitionTop } from "react-icons/tb"
import TodoItem from "../components/TodoItem"
import { untitledListColors } from "../assets/styles/untitledListColors"

type UntitledListViewProps = {
  listName: string
}

const UntitledListView = ({ listName }: UntitledListViewProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [isCompletedVisible, setIsCompletedVisible] = useState(true)

  // Data ảo
  // TODO: Thay thế sau
  const [todos, setTodos] = useState([
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
    <div
      className="relative flex h-full flex-1 flex-col overflow-hidden select-none"
      style={{ backgroundColor: untitledListColors.background }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          {listName} ({todos.length}){/* TODO: Thay thế sau */}
        </h1>
        <div className="flex items-center gap-3 text-white">
          <button
            className="rounded p-1.5 transition-colors"
            style={
              {
                "--hover-bg": untitledListColors.buttonHoverBg
              } as CSSProperties
            }
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                untitledListColors.buttonHoverBg)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <HiOutlineShare className="text-lg" />
          </button>
          <button
            className="rounded p-1.5 transition-colors"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                untitledListColors.buttonHoverBg)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <TbTransitionTop className="text-lg" />
          </button>
          <button
            className="rounded p-1.5 transition-colors"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                untitledListColors.buttonHoverBg)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <HiEllipsisHorizontal className="text-lg" />
          </button>
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-24">
        <div className="mx-auto max-w-full space-y-4">
          {/* Task cần làm */}
          <div className="space-y-0.5">
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
                  className="flex items-center gap-2 rounded px-3 py-1.5 text-[13px] font-medium text-white transition-colors"
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
                  <HiChevronDown
                    className={`text-sm transition-transform duration-200 ${!isCompletedVisible ? "-rotate-90" : ""}`}
                  />
                  Đã hoàn thành ({completedTodos.length})
                </button>
              </div>

              {/* Task làm xong */}
              {isCompletedVisible && (
                <div className="space-y-0.5">
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
          className="flex items-center overflow-hidden rounded-sm bg-white shadow-lg transition-all duration-200"
          style={{
            boxShadow: isInputFocused
              ? `0 0 0 2px ${untitledListColors.inputRing}`
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }}
        >
          <div className="flex items-center justify-center pr-3 pl-4 text-[22px]">
            <div
              className="h-5 w-5 rounded-full border-2"
              style={{ borderColor: untitledListColors.borderGray }}
            />
          </div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleAddTodo}
            placeholder="Thêm tác vụ"
            className="flex-1 bg-transparent py-4 text-[15px] outline-none"
            style={{ color: "#323130" }} // Standard dark text
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>
      </div>

    </div>
  )
}

export default UntitledListView
