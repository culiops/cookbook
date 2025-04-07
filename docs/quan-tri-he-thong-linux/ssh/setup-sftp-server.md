---
sidebar_position: 4
slug: trien-khai-sftp-server
title: "Hướng Dẫn Cài Đặt SFTP Server"
description: "Hướng dẫn cài đặt và cấu hình SFTP Server trên hệ thống Linux sử dụng OpenSSH"
---

# Hướng Dẫn Cài Đặt SFTP Server

SFTP (Secure File Transfer Protocol) cho phép truyền tải tập tin một cách bảo mật qua kết nối SSH. Hướng dẫn dưới đây sẽ giúp bạn cài đặt và cấu hình SFTP server trên hệ thống Linux.

---

## Cài Đặt OpenSSH Server

SFTP server thường được tích hợp trong gói OpenSSH Server. Nếu hệ thống của bạn chưa cài đặt OpenSSH Server, hãy cài đặt theo hướng dẫn sau:

### Trên Ubuntu/Debian
```bash
sudo apt update
sudo apt install openssh-server
```

### Trên CentOS/Red Hat
```bash
sudo yum install openssh-server
```


## Cấu Hình SFTP Server
Để hạn chế người dùng chỉ truy cập SFTP (không đăng nhập shell), bạn cần chỉnh sửa file cấu hình SSH tại `/etc/ssh/sshd_config`.

### Sửa Đổi Subsystem SFTP
Tìm dòng bắt đầu với `Subsystem sftp` và thay đổi nó thành:

```editorconfig title="/etc/ssh/sshd_config"
Subsystem sftp internal-sftp
```

### Cấu Hình Giới Hạn Người Dùng SFTP
Ví dụ, để tạo nhóm người dùng chỉ sử dụng SFTP (ví dụ: `sftpusers`), thêm các dòng sau vào cuối file `sshd_config`:

```editorconfig title="/etc/ssh/sshd_config"
Match Group sftpusers
    ChrootDirectory /home/%u
    ForceCommand internal-sftp
    X11Forwarding no
    AllowTcpForwarding no
```

**Giải thích**:
- **Match Group sftpusers**: Áp dụng cấu hình cho tất cả các người dùng thuộc nhóm sftpusers.
- **ChrootDirectory /home/%u**: Giới hạn người dùng vào thư mục /home/username (đảm bảo thư mục này được thiết lập đúng quyền).
- **ForceCommand internal-sftp**: Bắt buộc người dùng chỉ sử dụng SFTP mà không có shell.
- **X11Forwarding no & AllowTcpForwarding no**: Vô hiệu hóa chuyển tiếp X11 và TCP cho tăng cường bảo mật.

## Thiết Lập Người Dùng SFTP
### Tạo Nhóm Người Dùng SFTP
```bash
sudo groupadd sftpusers
```

### Tạo Người Dùng Mới và Thêm Vào Nhóm
Giả sử bạn muốn tạo người dùng có tên `sftpuser`:
```bash
sudo useradd -m -g sftpusers -s /usr/sbin/nologin sftpuser
sudo passwd sftpuser
```

:::note
Đường dẫn home của người dùng (ví dụ: `/home/sftpuser`) phải được sở hữu bởi root để chroot hoạt động đúng. Sau đó, bạn có thể tạo một thư mục con cho người dùng làm nơi lưu trữ tập tin, ví dụ:
:::

```bash
sudo mkdir /home/sftpuser/upload
sudo chown sftpuser:sftpusers /home/sftpuser/upload
```

## Khởi Động Lại Dịch Vụ SSH
Sau khi chỉnh sửa file cấu hình, khởi động lại dịch vụ SSH để thay đổi có hiệu lực.

```bash
sudo systemctl restart ssh
```

## Kiểm Tra Kết Nối SFTP
Từ máy khách, thử kết nối với SFTP bằng lệnh:
```bash
sftp sftpuser@your_server_ip
```

Nếu cấu hình đúng, bạn sẽ được chuyển trực tiếp vào phiên SFTP và chỉ có thể truy cập thư mục con đã được cấp quyền (ví dụ: thư mục `upload`).

## Khắc Phục Sự Cố

- **Lỗi "Permission denied"**:
Kiểm tra lại quyền của thư mục chroot (`/home/sftpuser`) phải thuộc root và có quyền `755`. Thư mục con (như `upload`) nên thuộc người dùng SFTP với quyền phù hợp (ví dụ: `700` hoặc `755`).

- **Không thể kết nối SFTP**:
Đảm bảo rằng dịch vụ SSH đang chạy và file cấu hình `/etc/ssh/sshd_config` không có lỗi cú pháp. Kiểm tra log của SSH để biết thêm chi tiết.