using AutoMapper;
using MouseTodoApp.Application.DTOs;
using MouseTodoApp.Domain.Entities;

namespace MouseTodoApp.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TodoItem, TodoItemResponseDTO>();
        }
    }
}
