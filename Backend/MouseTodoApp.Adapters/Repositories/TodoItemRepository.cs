using Microsoft.EntityFrameworkCore;
using MouseTodoApp.Application.Interfaces;
using MouseTodoApp.Domain.Entities;
using MouseTodoApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Adapters.Repositories
{
    public class TodoItemRepository : ITodoItemRepository
    {
        private readonly IApplicationDbContext _context;

        public TodoItemRepository(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TodoItem>> GetAllTodoItemsAsync()
        {
            var todoList = await _context.TodoItems.ToListAsync();
            return todoList;
        }

        public async Task<TodoItem> GetTodoItemByIdAsync(Guid id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            return todoItem == null ? throw new Exception("") : todoItem;
        }
    }
}
