import ReactPlayer from "react-player";
import { headerLogo } from "../assets/images";

function AboutUs() {
  return (
    <section className="max-container">
      <div className="flex justify-center">
        <img
          src="./logo2.svg"
          alt="logo"
          width={300}
          height={300}
          className="m-0 w-[300px] h-[300px]"
        />
      </div>

      <h2 className="font-palanquin text-center text-4xl font-bold">
        What is HoopVision?
      </h2>
      <p className="m-auto mt-5 max-w-4xl text-left info-text">
        HoopVision is an AI image detection application. You can use it to find
        max player speed, total distance ran, and team possession percentage
        through your uploaded NBA basketball clips.
      </p>
      <p className="m-auto mt-4 max-w-4xl text-left info-text">
        This application is made possible through the use of Ultralytics' AI
        image detection model, YOLOv8. By training the image detection model
        using ML we were able to improve detection accuracy for basketball
        related videos. OpenCV is another tool used to help facilitate our
        analytics through its video processing and object detection
        capabilities.
      </p>
      <p className="m-auto mt-4 max-w-4xl text-left info-text">
        We hope HoopVision will help you discover new insights about your
        favorite NBA players and teams. Take a look at one of our clips:
      </p>

      <div className="mt-5 flex justify-center">
        <video controls width={600}>
          <source src="./videos/nba_clip3.mp4" type="video/mp4" />
        </video>
        <video controls width={600}>
          <source src="./videos/about_video.mp4" type="video/mp4" />
        </video>
      </div>

      <h4 className="font-palanquin text-center font-bold text-4xl mt-4">
        Who makes this?
      </h4>
      <p className="m-auto mt-4 max-w-4xl text-center info-text">
        My name is Steven. You can reach me by email @steve.huu.nguyen@gmail.com
        .
      </p>
    </section>
  );
}

export default AboutUs;
