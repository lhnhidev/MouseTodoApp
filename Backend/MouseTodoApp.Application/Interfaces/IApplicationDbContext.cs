using Microsoft.EntityFrameworkCore;
using MouseTodoApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Application.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Step> Steps { get; }
        DbSet<TodoItem> TodoItems { get; }
        DbSet<TodoList> TodoLists { get; }

        // Khai báo phương thức SaveChanges để các Handler có thể gọi được
        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
