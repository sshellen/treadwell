import React from "react";
import styles from "../css/styles.css";

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="splash">
        <img src="/svg/logo.svg" />
      </div>
    );
  }
}

export default Splash;
