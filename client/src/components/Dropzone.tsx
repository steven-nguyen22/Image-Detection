import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
// import AdmZip from "adm-zip";

interface FileWithPreview extends File {
  preview: string;
}

interface RejectedFile {
  file: File;
  errors: { code: string; message: string }[];
}

interface ReturnFile extends File {
  preview: string;
}

// interface ReturnFile extends FileWithPreview {}

function Dropzone({ className }: { className: string }) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);
  const [returnFiles, setReturnFiles] = useState<ReturnFile[]>([]);
  const [showImage, setShowImage] = useState(false);

  async function download_video() {
    console.log("video download success");
    const response = await axios.get("http://localhost:8080/download_video", {
      responseType: "blob",
    });

    console.log(response);
    console.log(response.data);

    // var zip = new AdmZip(response.data);
    // var zipEntries = zip.getEntries();

    // // search for "index.html" which should be there
    // for (var i = 0; i < zipEntries.length; i++) {
    //   console.log(zip.readAsText(zipEntries[i]));
    // }

    //window.open(URL.createObjectURL(response.data));
    // const videoURL = URL.createObjectURL(response.data);
    // setVideoURL(videoURL);

    setReturnFiles((previousFiles) => [
      ...previousFiles,
      Object.assign(response.data, {
        preview: URL.createObjectURL(response.data),
      }),
    ]);

    setShowImage(false);

    // console.log(response);
    // const blob = response.data.blob();
    // let matrixBlob = new Blob([response.data], { type: "image/jpeg" });
    // const videoURL = URL.createObjectURL(blob);
    // console.log(matrixBlob);
    // console.log(videoURL);
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: RejectedFile[]) => {
      // Do something with the files
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (fileRejections?.length) {
        setRejected((previousFiles) => [...previousFiles, ...fileRejections]);
      }
    },
    []
  );

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 3,
    accept: {
      "video/mp4": [".mp4"],
    },
  });

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    console.log(files);
    // Working with multiple files
    // for (let i = 0; i < files.length; i++) {
    //   fd.append("file", files[i]);
    // }
    fd.append("file", files[0]);
    console.log(fd);
    removeFile(files[0].name);
    setShowImage(true);

    axios
      .post("http://localhost:8080/fileupload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          responseType: "blob",
        },
      })
      .then((res) => {
        console.log("Upload success");
        console.log(res);
        download_video();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <div {...getRootProps({ className })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop .mp4 files here, or click to select files</p>
          )}
        </div>

        {/* Preview */}
        <section className="mt-10">
          <div className="flex gap-4">
            <h2 className="title text-3xl font-semibold">Preview</h2>
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
            >
              Remove all files
            </button>
            <button
              type="submit"
              className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
            >
              Upload Video
            </button>
          </div>

          {/* Accepted files */}
          <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
            Accepted Files
          </h3>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
            {files.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg"
              >
                {/* <img
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-contain rounded-md"
                /> */}
                <video controls width={550}>
                  <source src={file.preview} type="video/mp4" />
                </video>
                <button
                  type="button"
                  className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                  onClick={() => removeFile(file.name)}
                >
                  <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                </button>
                <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>

          {/* Rejected Files */}
          <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
            Rejected Files
          </h3>
          <ul className="mt-6 flex flex-col">
            {rejected.map(({ file, errors }) => (
              <li key={file.name} className="flex items-start justify-between">
                <div>
                  <p className="mt-2 text-neutral-500 text-sm font-medium">
                    {file.name}
                  </p>
                  <ul className="text-[12px] text-red-400">
                    {errors.map((error) => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                  onClick={() => removeRejected(file.name)}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>

          {/* Returned files */}
          <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
            Returned Files
          </h3>
          {returnFiles && (
            <ul>
              {returnFiles.map((file) => (
                <li key={file.preview}>
                  <video controls width={550} key={file.name}>
                    <source src={file.preview} type="video/mp4" />
                  </video>
                </li>
              ))}
            </ul>
          )}
          {showImage && (
            <div className="flex justify-center">
              <img src="./spinner.svg" />
            </div>
          )}
        </section>
      </form>
    </div>
  );
}

export default Dropzone;
