import React, { useState, useRef } from "react";

function useFiles(initialState = []) {
  const [state, setstate] = useState(initialState);
  function withBlobs(files) {
    const blobs = [...files].map(file => {
      if (file.type.includes("image")) {
        console.log("image");
        file.preview = URL.createObjectURL(file);
        return file;
      }
    });
    setstate(blobs);
  }
  return [state, withBlobs];
}

function Upload({ onDrop }) {
  const [over, setover] = useState(false);
  const [files, setfiles] = useFiles([]);
  const $input = useRef(null);
  return (
    <>
      <div
        onClick={() => {
          $input.current.click();
        }}
        onDrop={e => {
          e.preventDefault();
          e.persist();
          setfiles(e.dataTransfer.files);
          setover(false);
        }}
        onDragOver={e => {
          e.preventDefault();
          setover(true);
        }}
        onDragLeave={e => {
          e.preventDefault();
          setover(false);
        }}
        className={over ? "upload-container over" : "upload-container"}
      >
        <h2>Upload files here!</h2>
        <img src={require("./images/upload.png")} className="bg" alt="bg" />
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={$input}
          onChange={e => {
            setfiles(e.target.files);
          }}
        />
      </div>
      <div className="blob-container">
        <h2>File Previews</h2>
        <p>{JSON.stringify(files.length)}</p>
      </div>
    </>
  );
}

export { Upload };
