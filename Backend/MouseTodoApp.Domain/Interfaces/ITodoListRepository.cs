using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Interfaces
{
    public interface ITodoListRepository
    {
        public Task<bool> ExistsAsync(Guid id);
    }
}
