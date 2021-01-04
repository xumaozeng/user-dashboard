import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage/IndexPage";
import Users from "./routes/Users";
import EmptyPage from "./routes/404/index";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/users" component={Users} />
        <Route component={EmptyPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
