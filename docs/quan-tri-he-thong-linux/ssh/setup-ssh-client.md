---
sidebar_position: 2
slug: su-dung-ssh-client
title: "Cấu hình và sử dụng SSH client"
description: "Hướng dẫn cách cấu hình và sử dụng SSH Client trên các hệ điều hành Linux và macOS"
---

## Tổng Quan

SSH Client là công cụ cho phép bạn kết nối đến máy chủ từ xa một cách an toàn. Bài hướng dẫn này sẽ giúp bạn:
- Kiểm tra cài đặt OpenSSH Client.
- Tạo cặp khóa SSH nếu cần.
- Cấu hình file `~/.ssh/config` để kết nối dễ dàng.
- Sử dụng SSH Client để đăng nhập và thực thi lệnh từ xa.

---

## Kiểm Tra Cài Đặt SSH Client

Trên hầu hết các hệ điều hành Linux và macOS, OpenSSH Client thường được cài đặt sẵn. Kiểm tra phiên bản hiện tại bằng lệnh:

```bash
ssh -V
```

Nếu chưa có, bạn có thể cài đặt theo hướng dẫn dành cho hệ điều hành của bạn.

## Tạo Cặp Khóa SSH (Nếu Cần)

Nếu bạn chưa có cặp khóa SSH, hãy tạo một cặp khóa mới bằng lệnh:
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
- Nhấn Enter để sử dụng đường dẫn mặc định `(~/.ssh/id_rsa)`.
- Nhập passphrase (tùy chọn) để tăng cường bảo mật.

Sau khi hoàn thành, bạn sẽ có:
- Private key: `~/.ssh/id_rsa`
- Public key: `~/.ssh/id_rsa.pub`

## Cấu Hình File SSH Client

Để quản lý các kết nối đến nhiều máy chủ dễ dàng hơn, bạn có thể tạo hoặc chỉnh sửa file cấu hình SSH Client tại `~/.ssh/config`.

```editorconfig title="~/.ssh/config"
# Cấu hình kết nối đến máy chủ "myserver"
Host myserver
    HostName example.com
    User your_username
    Port 22
    IdentityFile ~/.ssh/id_rsa

```

Trong file này:
- `Host`: Tên định danh cho kết nối, bạn có thể đặt bất kỳ tên nào.
- `HostName`: Địa chỉ IP hoặc domain của máy chủ.
- `User`: Tên đăng nhập trên máy chủ từ xa.
- `Port`: Cổng kết nối (mặc định là 22).
- `IdentityFile`: Đường dẫn đến private key bạn sử dụng.

Lưu file này lại và đảm bảo rằng thư mục ~/.ssh có quyền truy cập phù hợp:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
```

## Sử Dụng SSH Client

### Kết Nối Đến Máy Chủ
Sau khi cấu hình file `~/.ssh/config`, bạn có thể kết nối đến máy chủ bằng cách sử dụng tên định danh đã thiết lập:
```bash
ssh myserver
```

Nếu không sử dụng file cấu hình, bạn có thể kết nối trực tiếp:
```bash
ssh -i ~/.ssh/id_rsa your_username@example.com -p 22
```

### Thực Thi Lệnh Từ Xa

Bạn có thể thực thi một lệnh trên máy chủ từ xa mà không cần đăng nhập shell:
```bash
ssh myserver "ls -la /home/your_username"
```

## Khắc Phục Sự Cố
- **Lỗi xác thực**: Kiểm tra lại file ~/.ssh/config và đảm bảo rằng đường dẫn đến IdentityFile đúng.
- **Quyền truy cập**: Đảm bảo thư mục ~/.ssh và các file chứa khóa có quyền truy cập đúng (700 cho thư mục, 600 cho các file).
- **Kết nối**: Kiểm tra xem địa chỉ máy chủ và cổng kết nối có đúng không.