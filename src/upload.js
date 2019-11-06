import React, { useState, useEffect, useRef } from "react";

function removeItems(arr, item) {
  for (var i = 0; i < item; i++) {
    arr.pop();
  }
}

function useFiles({ initialState = [], maxFiles }) {
  const [state, setstate] = useState(initialState);
  function withBlobs(files) {
    const destructured = [...files];
    if (destructured.length > maxFiles) {
      const difference = destructured.length - maxFiles;
      removeItems(destructured, difference);
    }
    const blobs = destructured
      .map(file => {
        if (file.type.includes("image")) {
          console.log("image");
          file.preview = URL.createObjectURL(file);
          return file;
        }
        console.log("not image");
        return null;
      })
      .filter(elem => elem !== null);

    setstate(blobs);
  }
  return [state, withBlobs];
}

function Upload({ onDrop, maxFiles = 1 }) {
  const [over, setover] = useState(false);
  const [files, setfiles] = useFiles({ maxFiles });
  const $input = useRef(null);
  useEffect(() => {
    if (onDrop) {
      onDrop(files);
    }
  }, [files]);
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
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={$input}
          onChange={e => {
            setfiles(e.target.files);
          }}
          multiple={maxFiles > 1}
        />
      </div>
      <div className="blob-container">
        <h2>File Previews</h2>
        {files.map(file => (
          <img key={file.name + "file"} src={file.preview} alt="your file" />
        ))}
        <p>{JSON.stringify(files.length)}</p>
      </div>
    </>
  );
}

export { Upload };
