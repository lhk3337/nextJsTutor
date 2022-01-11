import { useEffect, useState } from "react";
import Seo from "../components/Seo";
const API_KEY = "1ca0919779771cad858efa04a2bc06c4";
const Home = () => {
  const [movies, setMovie] = useState();

  useEffect(() => {
    const fetchs = async () => {
      const { results } = await (await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)).json();
      setMovie(results);
    };
    fetchs();
  }, []);

  return (
    <div>
      <Seo title="Home" />
      {!movies && <h4>loading</h4>}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
};

export default Home;
