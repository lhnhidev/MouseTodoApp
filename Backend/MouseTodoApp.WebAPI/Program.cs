using Microsoft.EntityFrameworkCore;
using MouseTodoApp.Adapters;

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

var app = builder.Build();
app.UseCors();

app.Run();
