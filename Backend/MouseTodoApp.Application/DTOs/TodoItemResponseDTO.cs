using System;

namespace MouseTodoApp.Application.DTOs
{
    public record TodoItemResponseDTO(Guid Id, string Title, string? Note, bool IsCompleted, bool IsImportantCategory, bool IsInMyDayCategory, bool IsPlannedCategory, bool IsAssignedCategory, DateTime? DueDate, DateTime? ReminderTime);
    
}
