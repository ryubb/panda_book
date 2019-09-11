import React from "react";
import { Route, Switch } from "react-router-dom";
import Test from "./pages/Test";
import Timeline from "./pages/Timeline";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Test} exact />
      <Route path="/timelines" component={Timeline} />
    </Switch>
  );
};

export default App;
