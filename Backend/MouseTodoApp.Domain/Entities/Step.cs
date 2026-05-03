using MouseTodoApp.Domain.Extensions;

namespace MouseTodoApp.Domain.Entities
{
    public class Step
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public bool IsCompleted { get; private set; } = false;
        public Guid TodoItemId { get; private set; }
        public TodoItem TodoItem { get; private set; } = null!;
        private Step() { }
        public Step(string title, Guid todoItemId)
        {
            Id = Guid.NewGuid();
            Title = title.ThrowIfNullOrEmpty(nameof(title));
            TodoItemId = Guid.Parse(todoItemId.ToString().ThrowIfNullOrEmpty(nameof(todoItemId)));
        }
    }
}
