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

### styles JSX

- 컴포넌트에 style jsx를 선언하면 그 컴포넌트에서만 적용되고 하위 컴포넌트나 상위 컴포넌트에 영향을 주지 않는다.

- 크롬에서 Element로 class를 확인 해보면 중복되지 않게 랜덤으로 클래스를 만든다.
  ```css
  .active.jsx-a7f96dab9380f5e4 {
    color: yellow;
  }
  ```

styles JSX 선언하기

```jsx
<style jsx>{`
  nav {
    background-color: tomato;
  }
  a {
    text-decoration: none;
  }
`}</style>
```

### Custom App

- Custom App이 가장 먼저 렌더링 됨
- global style을 적용할 수 있음
- Custom App이 css를 임포트 할 수 있음

#### nextjs에서 랜더링 순서

1. \_app.js를 자동적으로 먼저 랜더링
2. 그 후 index.js
3. 그 다음 about.js 랜더링

<br />

\_app.js

```jsx
import NavBar from "../components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} /> // about과 index component가 렌더링됨
      <style jsx global>
        {`
          a {
            color: green; // style을 전역적으로 설정하는 방법
          }
        `}
      </style>
    </>
  );
}
```

## nextjs에서 head 태그 설정하기

```jsx
import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
```

## nextjs redirect

source 주소에서 destination주소로 Redirect 됨

### redirect 선언하기

```js
// next.config.js
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact", // 원래 주소
        destination: "/about", // 이동할 주소
        permanent: false, // redirection이 영구적인지 아닌지 설정
      },
      {
        source: "/form",
        destination: "/submit",
        permanent: false,
      },
    ];
  },
};
```

<br />

### ID값이 포함된 주소를 redirect 하기

```js
...
return [
  {
    source: "/old-blog/:path",
    destination: "/new-blog/:path",
    ...
  }
]
...
// /old-blog/1212 -> /new-blog/1212 (redirect)


...
return [
  {
    source: "/old-blog/:path*",
    destination: "/new-blog/:path*",
    ...
  }
]
...
// old-blog/1212/comments/1212 -> new-blog/1212/comments/1212
// path가 긴 주소를 redirect
```

## nextjs rewrite

redirect와 비슷하지만 유저가 URL변화를 볼 수 없음

```js
const API_KEY=precess.env.KEY
module.exports = {
  reactStrictMode: true,
  async redirects() {
    ...
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};
```

```js
useEffect(() => {
  const fetchs = async () => {
    const { results } = await (await fetch("/api/movies")).json(); // 받아오는 api URL
    setMovie(results);
  };
  fetchs();
}, []);
```

- api/movies주소를 입력하면 api response정보를 받아옴
- api의 URL에 포함된 api key가 나오지 않게 설정하려면 rewrite를 사용하면 됨

<br />

## Server Side Rendering

- html의 값이 나타남, 페이지를 로드 하기 전까지 빈 화면으로 보이고, 로드가 끝나면 한번에 모든 페이지가 나타남
- 서버 사이드 렌더링 미적용, api부분이 html에 없음 <br /><br />
  <img width="1000" alt="client side" src="https://user-images.githubusercontent.com/44824320/148928463-94eb0181-fefa-4985-905b-46177d122054.png">
  <br /> <br />
- 서버 사이드 적용, api부분이 html에 포함 되어 있음
  <img width="1000" alt="server side" src="https://user-images.githubusercontent.com/44824320/148928455-e50e13f6-3b88-405a-9cbf-b47403ac7b99.png">

### server side rendering 설정

```js
_app.js
export default function App({ Component, pageProps }) {
  console.log(pageProps); // getServerSideProps에서 리런한 results의 값이 pageProps로 전달
  ...
}
```

```js
index.jsx;
export default function Home({ results }) {
  // pageProps의 값이 -> results로 전달
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div key={movie.id} className="movie">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      ...
    </div>
  );
}

export async function getServerSideProps() {
  // Server side rendering declaration
  const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
  return {
    props: {
      results,
    },
  };
}
```
