import React, { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import "./style.css";

function Auth(props) {
  const [comp, setComp] = useState("login");

  const switchComp = () => {
    if (comp == "login") setComp("signup");
    else setComp("login");
  };

  return (
    <div className="auth">
      {comp == "login" ? (
        <Login switch={switchComp} {...props} />
      ) : (
        <Signup switch={switchComp} {...props} />
      )}
    </div>
  );
}

export default Auth;
