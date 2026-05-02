using MouseTodoApp.Domain.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Entities
{
    public class Step
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public bool IsCompleted { get; private set; } = false;
        public string TodoItemId { get; private set; } = string.Empty;

        private Step() { }
        public Step(string title, string todoItemId)
        {
            Title = title.ThrowIfNullOrEmpty(nameof(title));
            TodoItemId = todoItemId.ThrowIfNullOrEmpty(nameof(todoItemId));
        }
    }
}
