import React from "react";
import { Switch } from "react-router-dom";
import LayoutRoute from "./layout/LayoutRoute";
import Test from "./pages/Test";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import User from "./pages/User";
import Timeline from "./pages/Timeline";

const App = () => {
  return (
    <Switch>
      <LayoutRoute path="/" component={Test} exact />
      <LayoutRoute path="/signup" component={Signup} exact />
      <LayoutRoute path="/login" component={Login} exact />
      <LayoutRoute path="/users" component={User} />
      <LayoutRoute path="/timelines" component={Timeline} />
    </Switch>
  );
};

export default App;
