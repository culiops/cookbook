---
sidebar_position: 1
slug: cai-dat-ssh-server-tren-ubuntu
title: "Hướng Dẫn Cài Đặt SSH Server Trên Ubuntu"
description: "Hướng dẫn từng bước cài đặt, cấu hình và bảo mật SSH server trên Ubuntu"
---

## Tổng Quan

**SSH (Secure Shell)** là giao thức cho phép truy cập an toàn từ xa đến máy chủ của bạn. Hướng dẫn này sẽ giúp bạn cài đặt và cấu hình SSH server trên hệ điều hành phổ biến: **Ubuntu**

---

### Cập Nhật Danh Sách Gói

Trước khi cài đặt, hãy cập nhật danh sách gói để đảm bảo bạn có phiên bản mới nhất:
```bash
sudo apt update
```

### Cài Đặt OpenSSH Server

Cài đặt gói OpenSSH server:
```bash
sudo apt install openssh-server
```

### Kiểm Tra Trạng Thái Dịch Vụ SSH

Xác nhận rằng dịch vụ SSH đang chạy:
```bash
sudo systemctl status ssh
```

Nếu dịch vụ chưa chạy, khởi động nó:
```bash
sudo systemctl enable ssh
```

### Kích Hoạt SSH Khởi Động Cùng Hệ Thống

Để đảm bảo SSH khởi động tự động sau mỗi lần reboot, sử dụng lệnh:
```bash
sudo systemctl enable ssh
```

### (Tùy Chọn) Cấu Hình SSH Server

Bạn có thể thay đổi cấu hình bằng cách chỉnh sửa file /etc/ssh/sshd_config:
```bash
sudo vi /etc/ssh/sshd_config
```

- Đổi cổng mặc định (để tăng cường bảo mật qua việc ẩn danh):
    ```editorconfig title="/etc/ssh/sshd_config"
    Port 2222
    ```

- Vô hiệu hóa đăng nhập bằng tài khoản root:
    ```editorconfig title="/etc/ssh/sshd_config"
    PermitRootLogin no
    ```

Sau khi chỉnh sửa, khởi động lại dịch vụ:
```bash
sudo systemctl restart ssh
```

### Testing vơi SSH client

Từ một máy từ xa, kết nối bằng cách sử dụng:
```bash
ssh username@your_server_ip
```

Nếu bạn đã thay đổi cổng, hãy thêm cờ -p như sau:
```bash
ssh -p 2222 username@your_server_ip
```

## Khắc Phục Sự Cố

**Truy Cập Bị Từ Chối:**
- Kiểm tra lại xem khóa công khai của bạn đã được đặt chính xác trong file `~/.ssh/authorized_keys` trên máy chủ hay chưa.
- Xác minh quyền truy cập bằng cách sử dụng các lệnh sau:

    ```bash
    chmod 700 ~/.ssh
    chmod 600 ~/.ssh/authorized_keys
    ```

**Vấn Đề Kết Nối:**
- Đảm bảo rằng bạn đang sử dụng đúng khóa riêng.
- Xác nhận rằng dịch vụ SSH đã được khởi động lại thành công.