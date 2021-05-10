import React from "react";
import { Link } from "react-router-dom";
import Splash from "./splash";
import Header from "./components/Header";
import "../css/splide.css";
import "../css/styles.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showApp: true };
  }

  render() {
    return (
      <div>
        {this.state.showApp !== true && (
          <div>
            <Splash />
          </div>
        )}
        {this.state.showApp == true && (
          <div>
            <Header />
            <section>
              <h2 className="blueHeader blueUnderline">STATS</h2>
              <table className="statsTable">
                <thead>
                  <tr>
                    <th className="visuallyHidden">Measurement</th>
                    <th>Today</th>
                    <th className="visuallyHidden">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr scope="row">
                    <td>
                      <h3 className="blueHeader">
                        <Link to="/steps">Steps</Link>
                      </h3>
                      <p>69,598</p>
                      <p className="smallText">steps this week</p>
                    </td>
                    <td>
                      12,568 <span className="smallText">steps</span>
                    </td>
                    <td>
                      <Link to="/steps">
                        <img src="./svg/blueActionArrow.svg" />
                      </Link>
                    </td>
                  </tr>
                  <tr scope="row">
                    <td>
                      <h3 className="blueHeader">
                        <Link to="/distance">Distance</Link>
                      </h3>
                      <p>18.6</p>
                      <p className="smallText">mi this week</p>
                    </td>
                    <td>
                      5.2 <span className="smallText">mi</span>
                    </td>
                    <td>
                      <Link to="/distance">
                        {" "}
                        <img src="./svg/blueActionArrow.svg" />
                      </Link>
                    </td>
                  </tr>
                  <tr scope="row">
                    <td>
                      <h3 className="blueHeader">
                        <Link to="/calories">Calories</Link>
                      </h3>
                      <p>18,456</p>
                      <p className="smallText">cal this week</p>
                    </td>
                    <td>
                      2,911 <span className="smallText">cal</span>
                    </td>
                    <td>
                      <Link to="/calories">
                        <img src="./svg/blueActionArrow.svg" />
                      </Link>
                    </td>
                  </tr>
                  <tr scope="row">
                    <td>
                      <h3 className="blueHeader">
                        <Link to="/activity">Activity</Link>
                      </h3>
                      <p>2,260</p>
                      <p className="smallText">min this week</p>
                    </td>
                    <td />
                    <td rowSpan="4">
                      <Link to="/activity">
                        <img src="./svg/blueActionArrow.svg" />
                      </Link>
                    </td>
                  </tr>
                  <tr scope="row">
                    <td className="subCell">
                      <span>slow</span>
                    </td>
                    <td>
                      222 <span className="smallText">min</span>
                    </td>
                  </tr>
                  <tr scope="row">
                    <td className="subCell">
                      <span>moderate</span>
                    </td>
                    <td>
                      17 <span className="smallText">min</span>
                    </td>
                  </tr>
                  <tr scope="row">
                    <td className="subCell">
                      <span>intensity</span>
                    </td>
                    <td>
                      76 <span className="smallText">min</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="blueUnderline" />
            </section>
            <div className="spacer" />
            <div className="spacer" />
            <section>
              <h2 className="blueHeader blueUnderline">GOALS</h2>
              <div className="spacer" />
              <div className="buttonBar">
                <button className="selected">Weekly</button>
                <button>Monthly</button>
                <button>Yearly</button>
              </div>

              <div className="progressBarContainer">
                <h3>Calories</h3>
                <div className="progressBar">
                  <div className="goal">
                    <div style={{ right: "0%" }}>3000</div>
                  </div>
                  <div className="bar">
                    <div className="progress" style={{ width: "40%" }} />
                  </div>
                </div>
              </div>
              <div className="progressBarContainer">
                <h3>Distance</h3>
                <div className="progressBar">
                  <div className="goal">
                    <div style={{ right: "0%" }}>10 mi</div>
                  </div>
                  <div className="bar">
                    <div className="progress" style={{ width: "80%" }} />
                  </div>
                </div>
              </div>
              <div className="progressBarContainer">
                <h3>Calories</h3>
                <div className="progressBar">
                  <div className="goal">
                    <div style={{ right: "0%" }}>15,000</div>
                  </div>
                  <div className="bar">
                    <div className="progress" style={{ width: "50%" }} />
                  </div>
                </div>
              </div>
              <div className="progressBarContainer">
                <h3>Activity</h3>
                <div className="progressBar exceeded">
                  <div className="goal">
                    <div style={{ right: "20%" }}>2000 min</div>
                  </div>
                  <div className="bar">
                    <div className="progress" style={{ width: "80%" }} />
                  </div>
                  <div className="goalReached">2,780 min!</div>
                </div>
              </div>
              <div className="legend">
                <div className="smallText">
                  <img src="./svg/blueArrowDown.svg" /> = Goal expectation
                </div>
                <div className="smallText">
                  <img src="./svg/orangeArrowDown.svg" /> = Goal exceeded
                </div>
              </div>
            </section>
            <div className="spacer" />
            <div className="spacer" />
            <section>
              <table className="views">
                <thead>
                  <tr scope="col" className="blueUnderline">
                    <th className="title">VIEWS</th>
                    <th>Graph</th>
                    <th>Table</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="subheading">
                      Steps
                    </th>
                    <td>
                      <Link to="/steps">
                        <img src="./svg/goToGraph.svg" />
                      </Link>
                    </td>
                    <td>
                      <Link to="/stepsTable">
                        <img src="./svg/goToTable.svg" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="subheading">
                      Distance
                    </th>
                    <td>
                      <Link to="/distance">
                        <img src="./svg/goToGraph.svg" />
                      </Link>
                    </td>
                    <td>
                      <Link to="/distanceTable">
                        <img src="./svg/goToTable.svg" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="subheading">
                      Calories
                    </th>
                    <td>
                      <Link to="/calories">
                        <img src="./svg/goToGraph.svg" />
                      </Link>
                    </td>
                    <td>
                      <Link to="/caloriesTable">
                        <img src="./svg/goToTable.svg" />
                      </Link>
                    </td>
                  </tr>
                  <tr className="blueUnderline">
                    <th scope="row" className="subheading">
                      Activity
                    </th>
                    <td>
                      <Link to="/activity">
                        <img src="./svg/goToGraph.svg" />
                      </Link>
                    </td>
                    <td>
                      <Link to="/activityTable">
                        <img src="./svg/goToTable.svg" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <div className="spacer" />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
