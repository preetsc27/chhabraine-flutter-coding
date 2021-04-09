import React, { useRef, useState, useEffect } from "react";

function ImageUpload(props) {
  const songInput = useRef();
  const uploadButton = useRef();
  const errorMsg = useRef();
  const [file, setfile] = useState();

  useEffect(() => {
    uploadButton.current.disabled = true;
  }, []);
  const songPickedHandler = (e) => {
    if (e.target.files.length == 0) return;
    const file = e.target.files[0];

    const sizeInKB = Math.ceil(file.size / 1000);
    if (sizeInKB > 5000) {
      errorMsg.current.innerText =
        "Large file! File must be smaller than 5000kb";
      uploadButton.current.disabled = true;
      setfile(undefined);
      return;
    }
    uploadButton.current.disabled = false;
    errorMsg.current.innerText = "";
    setfile(file);
  };

  const uploadSongHandler = () => {
    if (!file) {
      errorMsg.current.innerText = "Please Select a file.";
      return;
    }
    const formData = new FormData();
    formData.append("song", file);
    uploadButton.current.innerText = "Uploading...";
    uploadButton.current.disabled = true;
    fetch(process.env.REACT_APP_SERVER + "/user/song", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        uploadButton.current.innerText = "Upload";
        uploadButton.current.disabled = false;
        errorMsg.current.innerText = "";
      })
      .catch(() => {
        errorMsg.current.innerText = "Uploading failed";
        uploadButton.current.innerText = "Upload";
        uploadButton.current.disabled = false;
      });
  };

  return (
    <div className="song-upload">
      <input
        ref={songInput}
        type="file"
        accept=".mp3,.wav"
        onChange={(e) => songPickedHandler(e)}
      />
      <div
        ref={errorMsg}
        style={{
          fontWeight: "bold",
          color: "red",
          fontSize: "0.7rem",
          letterSpacing: "1px",
          padding: "0 4px",
        }}
      ></div>

      <button ref={uploadButton} onClick={uploadSongHandler} type="button">
        Upload
      </button>
    </div>
  );
}

export default ImageUpload;
