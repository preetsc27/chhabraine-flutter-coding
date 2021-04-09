import "./App.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profile} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
