using Microsoft.AspNetCore.Mvc;

namespace MouseTodoApp.WebAPI.Controllers
{
    public class TodoItemController : ApiControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok("good");
        }
    }
}
