import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.menuOpen = false;
    this.mask = document.createElement("div");
    this.mask.classList.add("mask");
    this.mask.style.left = "0px";
    this.mask.style.top = "0px";
    this.body = document.getElementsByTagName("body")[0];
    this.closeMenu = document.createElement("img");
    this.closeMenu.src = "./svg/closeMenu.svg";
    this.closeMenu.classList.add("closeMenu");
  }

  menuListener = () => {
    this.toggleMenu();
  };

  menuOpened = () => {
    this.menuOpen = true;
    this.body.appendChild(this.mask);
    this.body.appendChild(this.closeMenu);
    this.closeMenu.addEventListener("click", this.menuListener);
  };

  handleLinkClick = link => {
    this.toggleMenu();
    this.props.history.push(link);
  };

  toggleMenu = () => {
    if (this.menuOpen) {
      this.body.style.position = "relative";
      this.menuOpen = false;
      this.closeMenu.removeEventListener("click", this.menuListener);
      this.mask.remove();
      this.closeMenu.remove();
      gsap.to("#flyoutMenu", {
        duration: 0.5,
        left: "-80%"
      });
    } else {
      this.body.style.position = "fixed";
      gsap.to("#flyoutMenu", {
        duration: 0.3,
        left: 0,
        onComplete: this.menuOpened
      });
    }
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <div id="flyoutMenu">
          <div className="home">
            <h2>HOME</h2>
          </div>
          <div className="menuItems">
            <h2>GRAPHS</h2>
            <ul>
              <li onClick={() => this.handleLinkClick("/stepsTable")}>STEPS</li>
              <li onClick={() => this.handleLinkClick("/distance")}>
                DISTANCE
              </li>
              <li onClick={() => this.handleLinkClick("/activity")}>
                ACTIVITY
              </li>
              <li onClick={() => this.handleLinkClick("/calories")}>
                CALORIES
              </li>
            </ul>
          </div>
          <div className="menuItems">
            <h2>TABLES</h2>
            <ul>
              <li onClick={() => this.handleLinkClick("/stepsTable")}>STEPS</li>
              <li onClick={() => this.handleLinkClick("/distanceTable")}>
                DISTANCE
              </li>
              <li onClick={() => this.handleLinkClick("/activityTable")}>
                ACTIVITY
              </li>
              <li onClick={() => this.handleLinkClick("/caloriesTable")}>
                CALORIES
              </li>
            </ul>
          </div>
        </div>
        <div id="header">
          <div className="left">
            <img
              src="./img/hamburger.png"
              height="16px"
              onClick={this.toggleMenu}
            />
          </div>
          <div className="middle">
            <Link to="/">
              <img src="./svg/logo.svg" height="40px" />
            </Link>
          </div>
          <div className="searchIcon right">
            <img src="./img/search.png" />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
