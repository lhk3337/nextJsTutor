# Next js

next js는 Server side Rendering

- 느린 속도로 인터넷을 이용하면 브라우저는 모든 자바스크립트코드와 react.js코드를 모두 가져오고 UI에 표시 (Client Side Rendering)
- 유저가 접속하면 바로 HTML을 미리 보내 생성,

<br />

## 1. nextjs에서 routing사용법

<br />

### nextjs 라우팅은 pages폴더의 파일 이름을 경로로 사용

- pages의 index.js만이 root 경로가 된다.
- pages폴더의 파일이 about.js이면 경로는 localhost:300/about이 된다.

<br />

### 링크 태그는 a태그 대신 Link태그 사용

```js
import Link from "next/link";

<Link href="/">Home</Link>;
```

<br />

### 만일 Link태그 안에 속성을 사용하고 싶으면 link 태그 안에 a태그를 추가한다.

```js
<Link href="/">
  <a className="home">Home</a>
</Link>
```

 <br />

### 현재 페이지에서 routing 정보를 확인하려면 useRouter를 사용하면 됨

```js
import { useRouter } from 'next/router'
const router = useRouter();
console.log(router) // {pathname: '/', route: '/', query: {…}, asPath: '/', components: {…}, …}
...
```

## 2. CSS

### CSS Modules

css를 사용할떄 파일명.module.css로 이름 붙여야 한다.

```jsx
<a className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}>Home</a>
// 백틱 방식
HTML -> <a class="link active">Home</a>

  <a className={[styles.link, router.pathname === "/about" ? styles.active : ""].join(" ")}>About</a>
// 배열 방식
```
