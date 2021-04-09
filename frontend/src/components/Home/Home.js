import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SongUpload from "../upload/SongUpload";
import "./Home.css";

let songs;
function Home(props) {
  const showMoreButton = useRef();
  const [homeBody, setHomeBody] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + "/user/songs")
      .then(async (res) => {
        let data = await res.json();
        const result = data.map((item, i) => (
          <div key={i}>
            <label>{item.songName}</label>
            <audio
              controls
              src={process.env.REACT_APP_SERVER + "/" + item.songPath}
            />
          </div>
        ));

        songs = [...result];

        setHomeBody(
          <div>
            {result}
            <button ref={showMoreButton} type="button" onClick={loadMore}>
              Show more
            </button>
          </div>
        );
      })
      .catch((err) => {
        setHomeBody(<h1>Unable to connect to the server</h1>);
      });
  }, []);

  function loadMore() {
    let songsLength = songs.length;
    if (songsLength / 25 - Math.floor(songsLength / 25) !== 0) {
      showMoreButton.current.style.display = "none";
      return;
    }
    showMoreButton.current.innerText = "loading";

    fetch(process.env.REACT_APP_SERVER + "/user/songs/" + songsLength).then(
      async (res) => {
        const data = await res.json();
        const result = data.map((item, i) => (
          <div key={i}>
            <label>{item.songName}</label>
            <audio
              controls
              src={process.env.REACT_APP_SERVER + "/" + item.songPath}
            />
          </div>
        ));

        songs.push(result);

        setHomeBody(
          <div>
            {songs}
            <button ref={showMoreButton} type="button" onClick={loadMore}>
              Show more
            </button>
          </div>
        );
        showMoreButton.current.innerText = "Show more";
      }
    );
  }

  return props.auth ? (
    <div className="home">
      <h1 style={{ width: "fit-content", margin: "5px auto" }}>Home</h1>
      <hr style={{ margin: "5px", color: "#eee" }} />
      <div className="home_head">
        <SongUpload />
        <div>
          <Link to="/profile">Your Profile</Link>
        </div>
      </div>
      <hr style={{ margin: "5px", color: "#eee" }} />
      <div className="home_body">{homeBody}</div>
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
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Home);
