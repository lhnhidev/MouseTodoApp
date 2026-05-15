using Microsoft.EntityFrameworkCore;
using MouseTodoApp.Application.Interfaces;
using MouseTodoApp.Domain.Entities;

namespace MouseTodoApp.Adapters.Persistence.Context
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Step> Steps { get; set; } = null!;
        public DbSet<TodoItem> TodoItems { get; set; } = null!;
        public DbSet<TodoList> TodoLists { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Quét và áp dụng toàn bộ Configuration trong cùng một Assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }
    }
}
