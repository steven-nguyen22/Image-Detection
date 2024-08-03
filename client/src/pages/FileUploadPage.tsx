import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Upload from "../components/Upload";
import Dropzone from "../components/Dropzone";

function FileUpload() {
  return (
    <div className="relative">
      <Navbar />
      <div className="xl:padding-l wide:padding-r padding-b">
        <section className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container">
          <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28">
            {/* <Upload /> */}
            <Dropzone className="p-16 mt-10 border border-neutral-200" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default FileUpload;
