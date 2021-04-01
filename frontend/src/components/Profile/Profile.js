import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ImageUpload from "../upload/ImageUpload";
import "./Profile.css";

function Profile(props) {
  const errMsg = useRef();
  const updateButton = useRef();
  const name = useRef();
  const [file, setFile] = useState("");

  const updateDetails = (e) => {
    e.preventDefault();
    if (!file) {
      errMsg.current.innerText = "Please Select a file";
      return;
    }
    const formData = new FormData();

    formData.append("name", name.current.value);
    formData.append("id", props.id);
    formData.append("image", file);
    updateButton.current.disabled = true;
    fetch(process.env.REACT_APP_SERVER + "/user/profile", {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      let data = await res.json();
      updateButton.current.disabled = false;
      console.log(data);

      props.loginAction(props.id, data.name, data.userPhoto);
    });
  };

  return props.auth ? (
    <div className="profile">
      <div className="profile_head">
        <div>
          <label>Your name: </label>
          <p>{props.name}</p>
        </div>
        <div>
          <label>Your Photo: </label>
          <img
            src={process.env.REACT_APP_SERVER + "/" + props.photo}
            height="200"
            width="200"
            alt="Profile pic"
          />
        </div>
      </div>
      <hr />

      <h1>Want to update?</h1>

      <form onSubmit={(e) => updateDetails(e)}>
        <div className="form-elem">
          <label>Name</label>
          <input ref={name} type="text" required maxLength="50" />
        </div>
        <div className="form-elem">
          <label>Profile Image</label>
          <ImageUpload onInput={(file) => setFile(file)} />
        </div>
        <small
          style={{
            color: "red",
            letterSpacing: "1px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            display: "block",
          }}
          ref={errMsg}
        ></small>
        <button ref={updateButton} className="profile_button" type="submit">
          Update
        </button>
      </form>
    </div>
  ) : (
    <div>
      <h1>Please login first</h1>
      <Link to="/auth">Login</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    auth: state.auth,
    name: state.name,
    photo: state.userPhoto,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (id, name, photo) =>
      dispatch({ type: "LOGIN", id, name, photo }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
