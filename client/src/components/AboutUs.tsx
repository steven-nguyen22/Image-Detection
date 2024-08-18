import ReactPlayer from "react-player";
import { headerLogo } from "../assets/images";

function AboutUs() {
  return (
    <section className="max-container pt-5">
      <div className="mt-4 flex justify-center">
        <img
          src={headerLogo}
          alt="logo"
          width={129}
          height={29}
          className="m-0 w-[129px] h-[29px]"
        />
      </div>

      <h2 className="font-palanquin text-center text-4xl font-bold">
        What is company_name?
      </h2>
      <p className="m-auto mt-4 max-w-4xl text-left info-text">
        company_name is an image detection application. You can use it to find
        max player speed, total distance ran, and team possession percentage
        through your uploaded NBA basketball clips.
      </p>
      <p className="m-auto mt-4 max-w-4xl text-left info-text">
        This application is made possible through the use of Ultralytics' AI
        image detection model, YOLOv8. By training the image detection model
        using ML we were able to improve detection accuracy for basketball
        related videos.
      </p>
      <p className="m-auto mt-4 max-w-4xl text-left info-text">
        We hope company_name will help you discover new insights about your
        favorite NBA players and teams. Take a look at one of our clips:
      </p>

      <div className="mt-4 flex justify-center">
        {/* avi videos don't work with video tag and ReactPlayer isn't playing the video from public folder */}
        <video controls width={650}>
          <source src="./videos/nba_clip.mp4" type="video/mp4" />
        </video>
        {/* <ReactPlayer url="./videos/nba_clip.mp4" /> */}
      </div>

      <h4 className="font-palanquin text-center font-bold text-4xl mt-4">
        Who makes this?
      </h4>
      <p className="m-auto mt-4 max-w-4xl text-center info-text">
        My name is Steven. You can reach me by email.
      </p>
    </section>
  );
}

export default AboutUs;
