### 🧠 1. 일반 정보 메타

```html
<!-- 문자 인코딩 -->
<meta charset="UTF-8" />
<meta name="description" content="페이지 설명" />
<meta name="keywords" content="HTML, CSS, JS" />
<meta name="author" content="jo4086" />
```

### 🔍 2. SEO 관련 메타

```html
<meta name="robots" content="index, follow" />
<!-- 검색엔진 허용 여부 -->
<meta name="google-site-verification" content="..." />
<link rel="canonical" href="https://yourdomain.com/page" />
```

### 📱 3. 모바일/브라우저 설정

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#333" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="Uinamic" />
```

### 🌐 4. Open Graph (페이스북, 카카오 등)

```html
<meta property="og:title" content="페이지 제목" />
<meta property="og:description" content="설명" />
<meta property="og:image" content="https://yourdomain.com/image.png" />
<meta property="og:url" content="https://yourdomain.com" />
<meta property="og:type" content="website" />
```

### 🐦 5. Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="페이지 제목" />
<meta name="twitter:description" content="설명" />
<meta name="twitter:image" content="https://yourdomain.com/image.png" />
```

### 🔐 6. 보안/정책 메타

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self';" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="referrer" content="no-referrer" />
```

### ✅ 메타 태그 모음 요약표

| 이름 / 속성             | 용도                         |
| ----------------------- | ---------------------------- |
| charset                 | 문자 인코딩                  |
| description             | 페이지 요약 설명 (SEO)       |
| viewport                | 모바일 반응형 설정           |
| theme-color             | 브라우저 UI 색상 설정        |
| og:\*                   | Open Graph (SNS 공유용)      |
| twitter:\*              | Twitter Cards                |
| robots                  | 검색 허용 여부               |
| author / keywords       | 페이지 정보                  |
| X-UA-Compatible         | IE 호환성 설정               |
| Content-Security-Policy | 보안 정책 (스크립트 제한 등) |
