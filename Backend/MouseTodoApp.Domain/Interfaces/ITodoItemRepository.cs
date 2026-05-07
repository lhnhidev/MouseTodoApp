using MouseTodoApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Interfaces
{
    public interface ITodoItemRepository
    {
        public Task<List<TodoItem>> GetAllTodoItemsAsync();
        public Task<TodoItem?> GetTodoItemByIdAsync(Guid id);
    }
}
