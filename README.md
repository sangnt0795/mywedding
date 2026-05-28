# mywedding

Landing page thiệp cưới phong cách Hàn Quốc hiện đại, mobile-first, có hiệu ứng mở phong bì, nhạc nền, album ảnh, lịch cưới, bản đồ và QR mừng cưới.

## Công nghệ

- React + Vite
- Tailwind CSS
- Framer Motion
- React Icons
- Deploy tĩnh, không backend

## Cài đặt

```bash
npm install
npm run dev
```

Mở URL Vite hiển thị trong terminal, thường là `http://localhost:5173`.

## Build production

```bash
npm run build
npm run preview
```

Thư mục build: `dist/`.

## Deploy GitHub Pages

Website public sau khi GitHub Pages deploy thành công:

```text
https://sangnt0795.github.io/mywedding/
```

Repository:

```text
https://github.com/sangnt0795/mywedding
```

Project đã có GitHub Actions tại `.github/workflows/pages.yml`.
Mỗi lần push lên nhánh `main`, GitHub sẽ tự build và deploy thư mục `dist/` lên GitHub Pages.

Cách deploy thủ công bằng package `gh-pages` đã cấu hình sẵn:

```bash
npm run deploy
```

Project đang dùng `base: './'` trong `vite.config.js`, nên asset public vẫn hoạt động khi deploy dưới subpath dạng `https://username.github.io/repository-name/`.

## Cấu hình dữ liệu

Toàn bộ dữ liệu nằm tại:

```text
src/data/weddingData.js
```

Các nhóm dữ liệu chính:

- Tên cô dâu/chú rể, ngày cưới, giờ lễ, giờ tiệc
- Ảnh cover, hero, album
- Timeline câu chuyện tình yêu
- Địa điểm và Google Maps
- Thông tin ngân hàng/QR mừng cưới
- Danh sách nhạc nền

Ví dụ đổi nhạc:

```js
musicList: ['/music/song1.mp3', '/music/song2.mp3', '/music/song3.mp3'];
```

## Thư mục asset

```text
public/images/
public/images/album/
public/images/qr/
public/music/
```

Asset demo đã có sẵn để website chạy ngay sau khi clone. Khi thay ảnh thật, giữ path trong `weddingData.js` hoặc cập nhật lại theo file mới.
