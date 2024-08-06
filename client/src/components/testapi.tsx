import axios from "axios";

function TestComp() {
  function handleUpload() {
    axios.post("http://localhost:8080/fileupload").then((res) => {
      console.log(res);
    });
  }
  return (
    <div>
      <button onClick={handleUpload}>test</button>
    </div>
  );
}

export default TestComp;
