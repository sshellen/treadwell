import React from "react";
import { Url } from "url-parse";
const { Router, Link } = require("react-router-dom");
const Breadcrumbs = () => {
  let path = window.location.pathname;

  path.split("/").map(name => {
    let link = <Link to={Router.propTypes}>name</Link>;
  });

  console.log(Router.propTypes.children);

  return <div>{path}</div>;
};

export default Breadcrumbs;
