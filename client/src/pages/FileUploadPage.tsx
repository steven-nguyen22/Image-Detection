import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState("");

  function handleUpload() {
    if (!file) {
      setMsg("no file selected");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    setMsg("uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
    axios
      .post("http://httpbin.org/post", fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: progressEvent.progress * 100 };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMsg("upload sucess");
        console.log(res.data);
      })
      .catch((err) => {
        setMsg("upload failed");
        console.error(err);
      });
  }

  return (
    <div className="relative">
      <Navbar />
      <div className="xl:padding-l wide:padding-r padding-b">
        <section className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container">
          <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28">
            <h1>Uploading files</h1>

            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              type="file"
            />

            <button onClick={handleUpload}>Upload</button>

            {progress.started && (
              <progress max="100" value={progress.pc}></progress>
            )}
            {msg && <span>{msg}</span>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FileUpload;
