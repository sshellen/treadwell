import React from "react";
import { Route } from "react-router-dom";

// Import Components
import { Breadcrumb } from "react-breadcrumbs";

// Create and export the component
const CrumbRoute = ({
  component: Component,
  includeSearch = false,
  render,
  ...props
}) => (
  <Route
    {...props}
    render={routeProps => (
      <Breadcrumb
        data={{
          title: props.title,
          pathname: routeProps.match.url,
          search: includeSearch ? routeProps.location.search : null
        }}
      >
        {Component ? <Component {...routeProps} /> : render(routeProps)}
      </Breadcrumb>
    )}
  />
);

export default CrumbRoute;
