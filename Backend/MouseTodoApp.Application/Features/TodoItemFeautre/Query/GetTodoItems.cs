using MediatR;
using MouseTodoApp.Application.DTOs;
using MouseTodoApp.Domain.Interfaces;
using System;
using System.Collections.Generic;

namespace MouseTodoApp.Application.Features.TodoItemFeautre.Query
{
    public record GetTodoItemsQuery() : IRequest<List<TodoItemResponseDTO>>;
    public class GetTodoItemsHandler : IRequestHandler<GetTodoItemsQuery, List<TodoItemResponseDTO>>
    {
        private readonly ITodoItemRepository _repo;

        public GetTodoItemsHandler(ITodoItemRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<TodoItemResponseDTO>> Handle(GetTodoItemsQuery request, CancellationToken cancellationToken)
        {
            var entities = await _repo.GetAllTodoItem();
            return entities.Select(x => new TodoItemResponseDTO(
                x.Id,
                x.Title,
                x.Note,
                x.IsCompleted,
                x.IsImportantCategory,
                x.IsInMyDayCategory,
                x.IsPlannedCategory,
                x.IsAssignedCategory,
                x.DueDate,
                x.ReminderTime)
            ).ToList();
        }
    }
}
