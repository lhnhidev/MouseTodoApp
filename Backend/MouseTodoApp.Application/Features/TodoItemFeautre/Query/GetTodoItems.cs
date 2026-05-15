using AutoMapper;
using MediatR;
using MouseTodoApp.Application.DTOs;
using MouseTodoApp.Domain.Interfaces;

namespace MouseTodoApp.Application.Features.TodoItemFeautre.Query
{
    public record GetTodoItemsQuery() : IRequest<List<TodoItemResponseDTO>>;
    public class GetTodoItemsHandler : IRequestHandler<GetTodoItemsQuery, List<TodoItemResponseDTO>>
    {
        private readonly ITodoItemRepository _repo;
        private readonly IMapper _mapper;

        public GetTodoItemsHandler(ITodoItemRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<TodoItemResponseDTO>> Handle(GetTodoItemsQuery request, CancellationToken cancellationToken)
        {
            var entities = await _repo.GetAllTodoItemsAsync();
            return _mapper.Map<List<TodoItemResponseDTO>>(entities);
        }
    }
}
