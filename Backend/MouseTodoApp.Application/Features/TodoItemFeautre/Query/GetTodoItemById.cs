using AutoMapper;
using MediatR;
using MouseTodoApp.Application.DTOs;
using MouseTodoApp.Domain.Interfaces;

namespace MouseTodoApp.Application.Features.TodoItemFeautre.Query
{
    public record GetTodoItemByIdQuery(Guid TodoItemId) : IRequest<TodoItemResponseDTO>;
    public class GetTodoItemByIdHandler : IRequestHandler<GetTodoItemByIdQuery, TodoItemResponseDTO>
    {
        private readonly ITodoItemRepository _repo;
        private readonly IMapper _mapper;

        public GetTodoItemByIdHandler(ITodoItemRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<TodoItemResponseDTO> Handle(GetTodoItemByIdQuery request, CancellationToken cancellationToken)
        {
            var todoItemId = request.TodoItemId;

            var todoItemEntity = await _repo.GetTodoItemByIdAsync(todoItemId);
            var todoItem = _mapper.Map<TodoItemResponseDTO>(todoItemEntity);

            return todoItem;
        }
    }
}
