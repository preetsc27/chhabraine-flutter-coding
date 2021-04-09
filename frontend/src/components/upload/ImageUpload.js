import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";

function ImageUpload(props) {
  const imageInput = useRef();
  const errorMsg = useRef();
  const [file, setfile] = useState();
  const [previewURL, setPreviewURL] = useState();

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const imagePickedHandler = (e) => {
    if (e.target.files.length == 0) return;
    const file = e.target.files[0];

    const sizeInKB = Math.ceil(file.size / 1000);
    if (sizeInKB > 800) {
      errorMsg.current.innerText =
        "Large file! File must be smaller than 800kb";
      setfile(undefined);
      setPreviewURL(undefined);
      return;
    }
    errorMsg.current.innerText = "";
    setfile(file);
    props.onInput(file);
  };

  const openImagePicker = () => {
    imageInput.current.click();
  };

  return (
    <div className="image-upload">
      <div className="image-upload_preview">
        <img src={previewURL} />
      </div>
      <input
        ref={imageInput}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={(e) => imagePickedHandler(e)}
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
        className="image-upload_error"
      ></div>

      <button onClick={openImagePicker} type="button">
        Pick a Image
      </button>
    </div>
  );
}

export default ImageUpload;
