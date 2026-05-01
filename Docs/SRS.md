# Tài liệu đặc tả yêu cầu (SRS) - v1.0.0

## Lịch sử cập nhật

| Phiên bản | Ngày cập nhật | Người thực hiện | Lý do        |
| --------- | ------------- | --------------- | ------------ |
| v1.0.0    | 01/05/2026    | Lê Hoàng Nhi    | Khởi tạo SRS |

## 1. Xác định mục tiêu & phạm vi

### Vấn đề cần giải quyết

- Thay thế việc ghi chép rời rạc trên giấy hoặc nhiều ứng dụng khác nhau bằng một nơi lưu trữ tập trung.
- Giúp người dùng phân loại đâu là việc cần làm ngay và đâu là việc có thể để sau.

### Đối tượng người dùng

- Các cá nhân cần tối ưu hóa công việc.

## 2. Danh sách tính năng & Công nghệ

### 2.1 Những tính năng bắt buộc phải có

- Xác thực & phân quyền: Đăng ký, Đăng nhập & Đăng xuất.
- Quản lý task: Tạo, xóa, đánh dấu hoàn thành và chỉnh sửa chi tiết công việc.
- Phân loại task: "Ngày của tôi", "Quan trọng", "Đã lập kế hoạch", "Đã giao cho tôi", "Tác vụ".
- Thiết lập deadline: Chọn ngày đến hạn (Due Date) cho mỗi công việc.
- Nhắc nhở (Reminders): Thông báo đẩy khi đến giờ thực hiện công việc.
- Quản lý danh sách (Lists): Tạo các thư mục riêng biệt như "Công việc", "Cá nhân", "Mua sắm".

### 2.2 Bổ sung sau

- Bước nhỏ (Steps/Subtasks): Chia một việc lớn thành nhiều đầu việc nhỏ hơn.
- Lặp lại (Recurring tasks): Tự động tạo lại task theo ngày, tuần hoặc tháng.
- Đính kèm file & ghi chú: Thêm tài liệu hoặc mô tả chi tiết cho task.
- Chia sẻ danh sách (Collaboration): Cho phép nhiều người cùng tham gia vào một danh sách công việc.
- Quên mật khẩu, xác thực qua email.

### 2.3 Công nghệ lựa chọn (tham khảo)

|   # | Tiêu chí           | Công nghệ                                                                                                                                                                        |
| --: | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1 | Ngôn ngữ lập trình | FE: TypeScript<br>BE: C#                                                                                                                                                         |
|   2 | Framework          | FE: React<br>BE: ASP.NET (.NET 10)                                                                                                                                               |
|   3 | Thư viện (Library) | FE: react-icons, prettier, eslint, tailwind, redux / zustand, react-hook-form<br>BE: ASP Identity Core, AutoMapper, FluentValidation, OpenAPI, EntityFrameworkCore, Linq.Dynamic |
|   4 | Database           | SQL Server                                                                                                                                                                       |
|   5 | Hạ tầng            | (Sẽ bổ sung sau khi quyết định)                                                                                                                                                  |

## 3. Công nghệ lựa chọn

- Kiến trúc phần mềm: Clean Architecture & Client-Server.

## 4. Công cụ quản lý và quy trình

- Quản lý mã nguồn: Git & GitHub.
- Quản lý công việc: Miro & GitHub Project.
- Môi trường giao tiếp: Discord.

## 5. Kế hoạch kiểm thử và triển khai (Testing & DevOps)

- Không có
