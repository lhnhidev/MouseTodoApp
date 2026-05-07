using MouseTodoApp.Domain.Exceptions;
using MouseTodoApp.Domain.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Entities
{
    public class TodoItem
    {
        private readonly List<Step> _steps = [];

        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string? Note { get; private set; } = string.Empty;
        public bool IsCompleted { get; private set; } = false;
        public bool IsImportantCategory { get; private set; }
        public bool IsInMyDayCategory { get; private set; }
        public bool IsPlannedCategory { get; private set; }
        public bool IsAssignedCategory { get; private set; }
        public DateTime? DueDate { get; private set; }
        public DateTime? ReminderTime { get; private set; }
        public Guid TodoListId { get; private set; }
        public TodoList TodoList { get; private set; } = null!;
        public IReadOnlyCollection<Step> Steps => _steps.AsReadOnly();

        private TodoItem() { }

        public TodoItem(
            string title,
            string? note,
            bool isImportantCategory,
            bool isInMyDayCategory,
            bool isPlannedCategory,
            bool isAssignedCategory,
            DateTime? dueDate,
            DateTime? reminderTime,
            Guid todoListId
        )
        {
            Title = title.ThrowIfNullOrEmpty(nameof(title));
            if (todoListId == Guid.Empty)
            {
                throw new ArgumentException("Todo list id cannot be empty.", nameof(todoListId));
            }

            TodoListId = todoListId;

            var validatedDueDate = dueDate?.ThrowIfPastDate(nameof(dueDate));
            var validatedReminderTime = reminderTime?.ThrowIfPastDate(nameof(reminderTime));

            if (validatedReminderTime.HasValue && validatedDueDate.HasValue)
            {
                validatedReminderTime = validatedReminderTime.Value.ThrowIfAfterTheTimeline(validatedDueDate.Value, nameof(reminderTime));
            }

            DueDate = validatedDueDate;
            ReminderTime = validatedReminderTime;

            Note = note;
            IsCompleted = false;
            IsImportantCategory = isImportantCategory;
            IsInMyDayCategory = isInMyDayCategory;
            IsPlannedCategory = isPlannedCategory;
            IsAssignedCategory = isAssignedCategory;
            _steps = [];

            Id = Guid.NewGuid();
        }

        public void AddStep(Step step)
        {
            _steps.Add(step);
        }
    }
}
