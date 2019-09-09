import React from "react";
import { Route, Switch } from "react-router-dom";
import Test from "./pages/Test";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Test} />
    </Switch>
  );
};

export default App;
