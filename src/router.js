import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage/IndexPage";
import User from "./routes/User";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/users" component={User} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
