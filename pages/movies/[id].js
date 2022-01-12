import Seo from "../../components/Seo";
export default function Detail({ data }) {
  return (
    <div className="container">
      <Seo title={data.title} />
      <h1>
        {data.title} ({data.runtime}분)
      </h1>
      <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
      <h4>개봉일 : {data.release_date}</h4>
      <h4>평점 : {data.vote_average}점</h4>
      <p>{data.overview}</p>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          img {
            margin: 0 auto;
            border-radius: 12px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }

          h1,
          h4 {
            text-align: center;
          }
          h4 {
            font-size: 18px;
          }
          p {
            width: 500px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
  const { id } = context.query;
  const data = await (await fetch(`http://localhost:3000/api/movies/${id}`)).json();
  return {
    props: { data },
  };
}
