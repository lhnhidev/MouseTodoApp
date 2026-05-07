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

            if (dueDate.HasValue)
            {
                DueDate = dueDate.Value.ThrowIfPastDate(nameof(dueDate));
            }
            else
            {
                DueDate = dueDate;
            }

            //if (reminderTime.HasValue)
            //{
            //    var validatedReminderTime = reminderTime.Value.ThrowIfPastDate(nameof(reminderTime));

            //    if (dueDate.HasValue)
            //    {
            //        ReminderTime = validatedReminderTime.ThrowIfAfterTheTimeline(dueDate.Value, nameof(reminderTime));
            //    }
            //    else
            //    {
            //        ReminderTime = validatedReminderTime;
            //    }
            //}
            //else
            //{
            //    ReminderTime = reminderTime;
            //}

            dueDate?.ThrowIfPastDate(nameof(dueDate));
            reminderTime?.ThrowIfPastDate(nameof(reminderTime));

            if (reminderTime.HasValue && dueDate.HasValue && reminderTime > dueDate)
            {
                throw new Exception("Thời gian nhắc nhở không được sau hạn chót!");
            }

            DueDate = dueDate;
            ReminderTime = reminderTime;

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
