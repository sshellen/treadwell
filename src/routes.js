import React, { Suspense, lazy } from "react";

import Loader from "./components/Loader";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
const { BrowserRouter, Route, Switch } = require("react-router-dom");

const Home = lazy(() => import("./Home"));
const Steps = lazy(() => import("./Steps/Steps"));
const Activity = lazy(() => import("./Activity/Activity"));
const Routes = (
  <BrowserRouter>
    <Suspense fallback=<Loader />>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/steps" component={Steps} />
        <Route path="/activity" component={Activity} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Routes;
