import React from "react";
import { connect } from "react-redux";

let form, formButton, formErrorMsg, formEmail, formPassword;
function Login(props) {
  const submission = (e) => {
    e.preventDefault();
    let data = {
      email: formEmail.value,
      password: formPassword.value,
    };
    formButton.disabled = true;
    fetch(process.env.REACT_APP_SERVER + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        let body = await res.json();
        if (res.status >= 200 && res.status < 300) {
          props.loginAction(body.id, body.name, body.userPhoto);
          form.reset();
          props.history.push("/");
        } else {
          if (formErrorMsg) formErrorMsg.innerText = body.message;
        }
        formButton.disabled = false;
      })
      .catch((err) => {
        if (formErrorMsg)
          formErrorMsg.innerText = "Error Connecting to database : " + err;
        if (formButton) formButton.disabled = false;
      });
  };

  return (
    <div className="login">
      <form ref={(el) => (form = el)} onSubmit={(e) => submission(e)}>
        <h1 className="login_heading">Login</h1>

        <div className="login_form-elem">
          <label>Email</label>
          <input
            placeholder="Enter email"
            type="email"
            required
            area-required="true"
            ref={(el) => (formEmail = el)}
          ></input>
        </div>

        <div className="login_form-elem">
          <label>Password</label>
          <input
            placeholder="Enter password"
            type="password"
            required
            area-required="true"
            minLength="6"
            ref={(el) => (formPassword = el)}
          ></input>
        </div>
        <div className="login_bottom">
          <button ref={(el) => (formButton = el)} type="submit">
            Login
          </button>
          <p>
            {"new here ?"} <span onClick={props.switch}>Sign up</span>
          </p>
        </div>
        <small
          style={{
            color: "yellow",
            letterSpacing: "1px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
          ref={(el) => (formErrorMsg = el)}
        ></small>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (id, name, photo) =>
      dispatch({ type: "LOGIN", id, name, photo }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
