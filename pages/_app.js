import Layout from "../components/Layout";
import "../styles/globals.css";
export default function App({ Component, pageProps }) {
  console.log(pageProps);
  return (
    <>
      <Layout>
        <Component {...pageProps} /> {/* index Component, about Component */}
      </Layout>
      <style jsx global>
        {`
          a {
            color: blue;
          }
        `}
      </style>
    </>
  );
}
