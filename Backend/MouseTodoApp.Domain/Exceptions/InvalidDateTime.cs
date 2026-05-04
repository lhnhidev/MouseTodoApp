using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Exceptions
{
    internal class InvalidDateTime(string fieldName) : DomainException($"Thời gian '{fieldName}' đã ở quá khứ hoặc sau một mốc thời gian đã cài đặt.")
    {
    }
}
