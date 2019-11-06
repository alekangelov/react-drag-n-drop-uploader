import React, { useState, useRef } from "react";

function useFiles(initialState = []) {
  const [state, setstate] = useState(initialState);
  function withBlobs(files) {
    console.log(files, "jakoto");
    const blobs = [...files].map(file => {
      file.preview = URL.createObjectURL(file);
      return file;
    });
    console.log(blobs, "blobs");
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
          console.log(e.dataTransfer.files);
          setfiles(e.dataTransfer.files);
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
        <img
          src={require("./images/upload.png")}
          onChange={e => {
            console.log(e.target.files);
            setfiles(e.target.files);
          }}
          className="bg"
          alt="bg"
        />
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={$input}
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
