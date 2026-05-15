using FluentValidation;
using MouseTodoApp.Application.Features.TodoItemFeautre.Query;
using System;
using System.Collections.Generic;
using System.Text;

namespace MouseTodoApp.Application.Validators
{
    public class GetTodoItemByIdQueryValidator : AbstractValidator<GetTodoItemByIdQuery>
    {
        public GetTodoItemByIdQueryValidator()
        {
            RuleFor(x => x.TodoItemId)
                .NotEmpty().WithMessage("TodoItemId không được rỗng");
        }
    }
}
