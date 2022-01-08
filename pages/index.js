import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <h1 className="active">Home</h1> {/* 컬러가 노란색으로 바뀌지 않음 */}
      <style jsx>{`
        a {
          color: blue;
        }
      `}</style>
    </div>
  );
};

export default Home;
