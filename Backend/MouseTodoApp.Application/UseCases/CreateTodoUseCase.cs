using MouseTodoApp.Application.Ports.Input;
using MouseTodoApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Application.UseCases
{
    public class CreateTodoUseCase : ICreateTodoUseCase
    {
        public string Execute(string title)
        {
            // 1. Khởi tạo Entity (Luật nghiệp vụ nếu có)
            var newTodo = new TodoItem { Title = title };

            // 2. Trả về kết quả (Sau này bạn sẽ gọi Output Port lưu DB ở đây)
            return $"Đã thêm task: '{newTodo.Title}' vào MouseTodoApp!";
        }
    }
}
