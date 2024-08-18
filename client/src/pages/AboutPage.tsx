import AboutUs from "../components/AboutUs";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <div className="relative">
      <Navbar />
      <section className="padding">
        <AboutUs />
      </section>
    </div>
  );
}

export default AboutPage;
