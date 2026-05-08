using MouseTodoApp.Application.Interfaces;
using MouseTodoApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Adapters.Repositories
{
    public class TodoListRepository : ITodoListRepository
    {
        private readonly IApplicationDbContext _context;

        public TodoListRepository(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            var todoList = await _context.TodoLists.FindAsync(id);

            Console.WriteLine($"-------------------------------------------------{todoList == null}");

            if (todoList == null)
            {
                return false;
            }
            return true;
        }
    }
}
