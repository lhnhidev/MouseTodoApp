using AutoMapper;
using MediatR;
using MouseTodoApp.Application.DTOs;
using MouseTodoApp.Application.Features.TodoItemFeautre.Query;
using MouseTodoApp.Domain.Entities;
using MouseTodoApp.Domain.Interfaces;
using System.Text.Json.Serialization;
using static System.Net.WebRequestMethods;

namespace MouseTodoApp.Application.Features.TodoItemFeautre.Command
{
    public record CreateTodoItemByIdOfTodoListCommand(
        [property: JsonIgnore] Guid TodoListId,
        string Title,
        string? Note,
        bool IsCompleted,
        bool IsImportantCategory,
        bool IsInMyDayCategory,
        bool IsPlannedCategory,
        bool IsAssignedCategory,
        DateTime? DueDate,
        DateTime? ReminderTime
    ) : IRequest<TodoItemResponseDTO>;
    public class CreateTodoItemByIdOfTodoList : IRequestHandler<CreateTodoItemByIdOfTodoListCommand, TodoItemResponseDTO>
    {
        private readonly ITodoItemRepository _repoTodoItem;
        private readonly ITodoListRepository _repoTodoList;
        private readonly IMapper _mapper;

        public CreateTodoItemByIdOfTodoList(ITodoItemRepository repoTodoItem, ITodoListRepository repoTodoList, IMapper mapper)
        {
            _repoTodoItem = repoTodoItem;
            _repoTodoList = repoTodoList;
            _mapper = mapper;
        }

        public async Task<TodoItemResponseDTO> Handle(CreateTodoItemByIdOfTodoListCommand request, CancellationToken cancellationToken)
        {
            var todoListExists = await _repoTodoList.ExistsAsync(request.TodoListId);
            if (!todoListExists)
            {
                throw new Exception($"TodoList with id {request.TodoListId} does not exist.");
            }

            var todoItemEntity = _mapper.Map<TodoItem>(request);

            await _repoTodoItem.CreateTodoItemAsync(todoItemEntity);

            return _mapper.Map<TodoItemResponseDTO>(todoItemEntity);
        }
    }
}
