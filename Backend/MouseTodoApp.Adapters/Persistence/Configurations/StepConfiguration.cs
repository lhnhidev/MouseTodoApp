using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MouseTodoApp.Domain.Entities;

namespace MouseTodoApp.Adapters.Persistence.Configurations
{
    internal class StepConfiguration : IEntityTypeConfiguration<Step>
    {
        public void Configure(EntityTypeBuilder<Step> builder)
        {
            builder.ToTable("Steps");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Title)
                .IsRequired();

            builder.Property(t => t.IsCompleted)
                .HasDefaultValue(false);

            builder.Property(t => t.TodoItemId)
                .IsRequired();

            builder.HasOne(t => t.TodoItem)
                .WithMany(c => c.Steps)
                .HasForeignKey(t => t.TodoItemId)
                .OnDelete(DeleteBehavior.Cascade); // Khi xóa TodoItem thì các Step cũng phải bị xóa
        }
    }
}
