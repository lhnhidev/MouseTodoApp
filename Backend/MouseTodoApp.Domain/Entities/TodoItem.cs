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

        public IReadOnlyCollection<Step> Steps => _steps.AsReadOnly();

        private TodoItem() { }

        public TodoItem(
            string title,
            string? note,
            bool isImportantCategory,
            bool isInMyDayCategory,
            bool isPlantedCategory,
            bool isAssignmentedCategory,
            DateTime? dueDate,
            DateTime? reminderTime,
            string todoListId
        )
        {
            Title = title.ThrowIfNullOrEmpty(nameof(title));
            TodoListId = todoListId.ThrowIfNullOrEmpty(nameof(todoListId));

            if (dueDate.HasValue)
            {
                DueDate = dueDate.Value.ThrowIfPastDate(nameof(dueDate));
            }
            else
            {
                DueDate = dueDate;
            }

            if (reminderTime.HasValue)
            {
                if (dueDate.HasValue)
                {
                    ReminderTime = reminderTime.Value.ThrowIfAfterTheTimeline(dueDate.Value, nameof(reminderTime));
                }
                else
                {
                    ReminderTime = reminderTime;
                }
            }
            else
            {
                ReminderTime = reminderTime;
            }

            Note = note;
            IsCompleted = false;
            IsImportantCategory = isImportantCategory;
            IsInMyDayCategory = isInMyDayCategory;
            IsPlantedCategory = isPlantedCategory;
            IsAssignmentedCategory = isAssignmentedCategory;

            Id = Guid.NewGuid();
        }

        public void AddStep(Step step)
        {
            _steps.Add(step);
        }
    }
}
