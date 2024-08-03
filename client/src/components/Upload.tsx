import axios from "axios";
import { useState } from "react";

function Upload() {
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
    <>
      <div>
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
    </>
  );
}

export default Upload;
