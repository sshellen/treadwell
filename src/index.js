import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Loader from "./components/Loader";

const { BrowserRouter, Route, Switch } = require("react-router-dom");

const Home = lazy(() => import("./Home"));
const Steps = lazy(() => import("./steps/Steps"));
const Activity = lazy(() => import("./activity/Activity"));
const Distance = lazy(() => import("./distance/Distance"));
const Calories = lazy(() => import("./calories/Calories"));
const StepsTable = lazy(() => import("./tables/Steps"));
const DistanceTable = lazy(() => import("./tables/Distance"));
const ActivityTable = lazy(() => import("./tables/Activity"));
const CaloriesTable = lazy(() => import("./tables/Calories"));

const Routes = (
  <BrowserRouter basename={"/treadwell"}>
    <Suspense fallback=<Loader />>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/steps" exact component={Steps} />
        <Route path="/activity" exact component={Activity} />
        <Route path="/distance" exact component={Distance} />
        <Route path="/calories" exact component={Calories} />
        <Route path="/stepsTable" exact component={StepsTable} />
        <Route path="/distanceTable" exact component={DistanceTable} />
        <Route path="/activityTable" exact component={ActivityTable} />
        <Route path="/caloriesTable" exact component={CaloriesTable} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

ReactDOM.render(Routes, document.getElementById("app"));
