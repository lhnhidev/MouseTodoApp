using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using MouseTodoApp.Adapters;
using MouseTodoApp.Adapters.Repositories;
using MouseTodoApp.Application.Interfaces;
using MouseTodoApp.Domain.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình CORS (Cho phép React gọi API mà không bị chặn)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

// Thêm kết nối SQL Server, đọc connection string từ appsettings.json)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Đăng ký MediatR: Nó sẽ quét toàn bộ project Application để tìm các Handler
builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(typeof(MouseTodoApp.Application.DTOs.TodoItemResponseDTO).Assembly);
});

// Đăng ký Controllers và cấu hình route convention
builder.Services.AddControllers(options =>
{
    // Áp dụng transformer cho tất cả các đường dẫn
    options.Conventions.Add(new RouteTokenTransformerConvention(new KebabCaseParameterTransformer()));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

builder.Services.AddScoped<ITodoItemRepository, TodoItemRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Mặc định sẽ chạy tại đường dẫn /swagger
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
