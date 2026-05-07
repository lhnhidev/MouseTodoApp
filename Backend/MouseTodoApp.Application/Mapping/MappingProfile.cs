using AutoMapper;
using MouseTodoApp.Application.DTOs;
using MouseTodoApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

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
