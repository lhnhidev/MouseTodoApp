using MouseTodoApp.Application.Ports.Input;
using MouseTodoApp.Application.UseCases;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký DI: Yêu cầu ICreateTodoUseCase thì lấy CreateTodoUseCase ra xài
builder.Services.AddScoped<ICreateTodoUseCase, CreateTodoUseCase>();

// Cấu hình CORS (Cho phép React gọi API mà không bị chặn)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

// API Endpoint
app.MapPost("/api/todos", (string title, ICreateTodoUseCase useCase) =>
{
    var result = useCase.Execute(title);
    return Results.Ok(new { message = result });
});

app.Run();