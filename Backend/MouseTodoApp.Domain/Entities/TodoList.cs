using MouseTodoApp.Domain.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Entities
{
    public class TodoList
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string ColorTheme { get; private set; } = string.Empty;
        public string UserId { get; private set; } = string.Empty;

        private readonly List<TodoItem> _todoItems = [];
        public IReadOnlyCollection<TodoItem> TodoItems => _todoItems.AsReadOnly();
        private TodoList() { }

        public TodoList(string title, string colorTheme, string userId)
        {
            Title = title.ThrowIfNullOrEmpty(nameof(title));
            ColorTheme = colorTheme.ThrowIfNullOrEmpty(nameof(colorTheme));
            UserId = userId.ThrowIfNullOrEmpty(nameof(userId));

            Id = Guid.NewGuid();
        }

        public void AddTodoItem(TodoItem item)
        {
            _todoItems.Add(item);
        }
    }
}
