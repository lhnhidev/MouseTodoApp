using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MouseTodoApp.Domain.Entities;

namespace MouseTodoApp.Adapters.Configurations
{
    internal class TodoListConfiguration : IEntityTypeConfiguration<TodoList>
    {
        public void Configure(EntityTypeBuilder<TodoList> builder)
        {
            builder.ToTable("TodoLists");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Title)
                .IsRequired();

            builder.Property(t => t.ColorTheme)
                .IsRequired();

            builder.Property(t => t.UserId)
                .IsRequired();

            // Mối quan hệ 1 - n với bảng TodoItems được định nghĩa tại file TodoItemConfiguration.cs
        }
    }
}
