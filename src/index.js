import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import { Upload } from "./upload";

function App() {
  return (
    <div className="App">
      <Upload
        onDrop={files => {
          console.log(files);
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
