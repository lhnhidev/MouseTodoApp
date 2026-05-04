using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Domain.Exceptions
{
    internal abstract class DomainException(string message) : Exception(message)
    {
    }
}
