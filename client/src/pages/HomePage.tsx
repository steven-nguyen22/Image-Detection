import About from "../components/About";
import Home from "../components/Home";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <div className="relative">
      <Navbar />
      <div className="xl:padding-l wide:padding-r padding-b">
        <Home />
      </div>
      <div className="padding">
        <About />
      </div>
    </div>
  );
}

export default HomePage;
