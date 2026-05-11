using AutoMapper;
using Microsoft.AspNetCore.Routing.Constraints;
using MouseTodoApp.Application.DTOs;
using MouseTodoApp.Application.Features.TodoItemFeautre.Command;
using MouseTodoApp.Domain.Entities;

namespace MouseTodoApp.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TodoItem, TodoItemResponseDTO>();
            CreateMap<CreateTodoItemByIdOfTodoListCommand, TodoItem>();
        }
    }
}
