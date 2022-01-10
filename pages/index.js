import Seo from "../components/Seo";

const Home = () => {
  return (
    <div>
      <Seo title="Home" />
      <h1 className="active">Home</h1> {/* 컬러가 노란색으로 바뀌지 않음 */}
    </div>
  );
};

export default Home;
