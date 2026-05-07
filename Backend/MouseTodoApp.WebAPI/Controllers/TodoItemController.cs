using MediatR;
using Microsoft.AspNetCore.Mvc;
using MouseTodoApp.Application.Features.TodoItemFeautre.Query;

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
            return Ok(todoItem);
        }
    }
}
