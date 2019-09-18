import React from "react";
import { Switch } from "react-router-dom";
import LauoutRoute from "./layout/LayoutRoute";
import Test from "./pages/Test";
import Timeline from "./pages/Timeline";

const App = () => {
  return (
    <Switch>
      <LauoutRoute path="/" component={Test} exact />
      <LauoutRoute path="/timelines" component={Timeline} />
    </Switch>
  );
};

export default App;
