import React from "react";
import { Link } from "react-router-dom";
import WeeklyGraphs from "./WeeklyGraphs";
import MonthlyGraphs from "./MonthlyGraphs";
import YearlyGraphs from "./YearlyGraphs";
import Header from "../components/Header";
import Filter from "../components/Filter";
import "../../css/splide.css";
import "../../css/styles.css";

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: "months",
      graphsToShow: "months",
      data: {},
      year: 2015,
      month: 1
    };
  }

  handleButtonRow = (e, page) => {
    this.props.history.push(page);
  };

  handleMonth = month => {
    this.setState({ month });
  };
  handleYear = year => {
    this.setState({ year });
  };

  handleClick = (e, graph) => {
    let buttons = Array.prototype.slice.call(
      document
        .getElementsByClassName("buttonBar")[0]
        .getElementsByTagName("button")
    );
    buttons.map(button => {
      button.classList.remove("selected");
    });
    this.setState({ graphsToShow: graph, filterType: graph });
    e.target.classList.add("selected");
  };

  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <h1>STEPS GRAPHS</h1>
        <Filter
          filterType={this.state.filterType}
          handleYear={this.handleYear}
          handleMonth={this.handleMonth}
        />
        <section>
          <div className="buttonBar">
            <button onClick={e => this.handleClick(e, "weeks")}>Weekly</button>
            <button
              onClick={e => this.handleClick(e, "months")}
              className="selected"
            >
              Monthly
            </button>
            <button onClick={e => this.handleClick(e, "years")}> Yearly</button>
          </div>
          {this.state.graphsToShow === "weeks" && (
            <WeeklyGraphs month={this.state.month} year={this.state.year} />
          )}
          {this.state.graphsToShow === "months" && (
            <MonthlyGraphs year={this.state.year} />
          )}

          {this.state.graphsToShow === "years" && <YearlyGraphs />}
          <div className="nextLink">
            <Link to="/stepsTable">See table</Link>
          </div>
          <div className="buttonRow">
            <button
              className="orangeButton"
              onClick={e => this.handleButtonRow(e, "/distance")}
            >
              DISTANCE
            </button>
            <button
              className="orangeButton"
              onClick={e => this.handleButtonRow(e, "/calories")}
            >
              CALORIES
            </button>
            <button
              className="orangeButton"
              onClick={e => this.handleButtonRow(e, "/activity")}
            >
              ACTIVITY
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default Steps;
