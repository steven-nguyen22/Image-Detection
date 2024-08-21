import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HoopCanvas from "./BasketballHoop";

function Home() {
  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28">
        <p className="text-xl font-montserrat text-coral-red">
          Upload Your Own Clips
        </p>

        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
            Image Tracking
          </span>
          <br />
          <span className="text-coral-red inline-block mt-3">NBA</span> Videos
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Unlock the full potential of your favorite NBA videos with HoopVision,
          the AI-powered tool that tracks and reveals the hidden stats behind
          every play.
        </p>

        <Link to="/fileupload">
          <button className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none bg-coral-red text-white border-coral-red rounded-full">
            Get Started
            <div className="ml-2">
              <FaArrowRightLong />
            </div>
          </button>
        </Link>
      </div>

      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-my-orange bg-hero bg-cover bg-center">
        <HoopCanvas />
      </div>
    </section>
  );
}

export default Home;
