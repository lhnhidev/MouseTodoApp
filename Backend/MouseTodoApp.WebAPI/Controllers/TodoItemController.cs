using MediatR;
using Microsoft.AspNetCore.Mvc;
using MouseTodoApp.Application.Features.TodoItemFeautre.Command;
using MouseTodoApp.Application.Features.TodoItemFeautre.Query;
using MouseTodoApp.Domain.Entities;

namespace MouseTodoApp.WebAPI.Controllers
{
    public class TodoItemController : ApiControllerBase
    {
        private readonly IMediator _mediator;

        public TodoItemController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetTodoItemsQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoItemById([FromRoute] Guid id)
        {
            var todoItem = await _mediator.Send(new GetTodoItemByIdQuery(id));

            if (todoItem == null)
            {
                return NotFound($"Không tìm thấy TodoItem có id: {id}");
            }

            return Ok(todoItem);
        }

        [HttpPost("{todoListId}")]
        public async Task<IActionResult> CreateTodoItemByIdOfTodoList([FromBody] CreateTodoItemByIdOfTodoListCommand todoItemRequest, [FromRoute] Guid todoListId)
        {
            var command = todoItemRequest with { TodoListId = todoListId };
            var todoItem = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetTodoItemById), new { id = todoItem.Id }, todoItem);
        }
    }
}
