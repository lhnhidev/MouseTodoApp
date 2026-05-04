using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Application.Ports.Input
{
    public interface ICreateTodoUseCase
    {
        string Execute(string title);
    }
}
