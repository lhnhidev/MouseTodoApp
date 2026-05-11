using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MouseTodoApp.Domain.Entities;

namespace MouseTodoApp.Adapters.Configurations
{
    internal class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
    {
        public void Configure(EntityTypeBuilder<TodoItem> builder)
        {
            builder.ToTable("TodoItems");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Title)
                .IsRequired();

            builder.Property(t => t.Note)
                .HasDefaultValue("");

            builder.Property(t => t.IsCompleted)
                .HasDefaultValue(false);

            builder.Property(t => t.IsImportantCategory)
                .HasDefaultValue(false);

            builder.Property(t => t.IsInMyDayCategory)
                .HasDefaultValue(false);

            builder.Property(t => t.IsPlannedCategory)
                .HasDefaultValue(false);

            builder.Property(t => t.IsAssignedCategory)
                .HasDefaultValue(false);

            builder.HasOne(t => t.TodoList)
                .WithMany(c => c.TodoItems)
                .HasForeignKey(t => t.TodoListId)
                .OnDelete(DeleteBehavior.Cascade); // Xóa tất cả TodoItem nếu TodoList bị xóa

            // DueDate, ReminderTime được phép là null nên bỏ qua
            // Mối quan hệ 1 - n với bảng Steps được định nghĩa tại file StepConfiguration.cs
        }
    }
}
