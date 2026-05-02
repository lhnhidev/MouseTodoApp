using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Exceptions
{
    internal class InvalidValueException(string fieldName) : DomainException($"Tiêu đề '{fieldName}' không hợp lệ hoặc không được để trống.")
    {
    }
}
