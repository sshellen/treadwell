import React from "react";
import Filter from "../components/Filter";
import "../../css/styles.css";
import HammerJS from "HammerJS";
import Header from "../components/Header";
import { monthNames, monthsToMatch } from "../config/charts";
import { Link } from "react-router-dom";
const loadData = () => import("../../data/fitbitData.csv");

const dateOptions = {
  weekday: "short",
  month: "numeric",
  day: "numeric"
};

let mc = [];

class ActivityTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterType: "months", year: 2015, months: [] };
  }

  handleButtonRow = (e, page) => {
    this.props.history.push(page);
  };

  handleYear = year => {
    this.removeListeners();
    this.setState({ year }, () => {
      this.getMonths(this.state.year).then(months =>
        this.setState({ months }, () => {
          this.addListeners();
          let tables = document.getElementsByClassName("dataTable");
          for (let i = 0; i < tables.length; i++) {
            tables[i].classList.replace("opened", "closed");
          }
          tables[0].classList.replace("closed", "opened");
        })
      );
    });
  };

  openCloseMenu = e => {
    let table = e.target.closest("table");
    let opened = table.classList.contains("opened");
    if (opened) {
      table.classList.add("closed");
      table.classList.remove("opened");
    } else {
      table.classList.add("opened");
      table.classList.remove("closed");
    }
  };

  getMonths = async year => {
    let dateArr = [];
    let months = [];
    return new Promise((resolve, reject) => {
      loadData().then(data => {
        for (let obj in data) {
          if (data[obj].Date && +data[obj].Date.substr(6, 4) === +year) {
            dateArr.push({
              month: "-" + data[obj].Date.substr(3, 2) + "-",
              date: [
                +data[obj].Date.substr(6, 4),

                +data[obj].Date.substr(3, 2),

                +data[obj].Date.substr(0, 2)
              ],
              activity:
                +data[obj].SlowActivity +
                +data[obj].ModerateActivity +
                +data[obj].IntenseActivity
            });
          }
        }

        monthsToMatch.map(val => {
          let regex = new RegExp(`${val}`, "g");
          let month = parseInt(val.replace("-", ""));

          let monthArr = dateArr.filter(arr => {
            return arr["month"].match(regex);
          });

          months.push({ month: month, monthArr: monthArr });
        });

        resolve(months);
        reject("error with promise");
      });
    });
  };
  addListeners = () => {
    let accordions = document.getElementsByTagName("caption");

    Array.prototype.slice.call(accordions).map((accordion, ind) => {
      mc[ind] = new Hammer.Manager(accordion);
      mc[ind].add(new Hammer.Tap());
      mc[ind].on("tap", this.openCloseMenu);
    });
  };

  removeListeners = () => {
    let accordions = document.getElementsByTagName("caption");
    mc.map(mcInstance => {
      mcInstance.off("tap", this.openCloseMenu);
    });
  };
  componentDidMount() {
    this.getMonths(this.state.year).then(months => {
      this.setState({ months });
      this.addListeners();
      let table = document.getElementsByClassName("dataTable")[0];
      table.classList.add("opened");
      table.classList.remove("closed");
    });
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <h1>ACTIVITY TABLE</h1>
        <Filter
          filterType={this.state.filterType}
          handleYear={this.handleYear}
        />
        <section>
          {this.state.months.map(
            (month, ind1) =>
              month.monthArr.length > 0 && (
                <table
                  className="dataTable closed"
                  id={`table${ind1}`}
                  key={`table${ind1}`}
                >
                  <caption>
                    <div className="caption">
                      <span className="description">
                        {" "}
                        <span className="visuallyHidden">
                          {" "}
                          Total Activity for{" "}
                        </span>
                        {monthNames[month.month - 1]} {this.state.year}
                      </span>
                      <span className="accordion collapse open" />
                    </div>
                  </caption>
                  <thead>
                    <tr>
                      <th> DAY </th>
                      <th> MINUTES </th>
                    </tr>
                  </thead>
                  {month.monthArr.map((month, ind2) => (
                    <tbody
                      id={`tbody${ind2}`}
                      key={`tbody${ind2}`}
                      className="closed"
                    >
                      <tr>
                        <td className="day">
                          {" "}
                          {new Date(
                            month.date[0],
                            month.date[1] - 1,
                            month.date[2]
                          ).toLocaleDateString("en-US", dateOptions)}
                        </td>
                        <td> {month.activity} </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              )
          )}
          <div className="nextLink">
            <Link to="/activity">See graphs</Link>
          </div>
        </section>

        <section>
          <div className="buttonRow">
            <button
              className="orangeButton"
              onClick={e => this.handleButtonRow(e, "/distanceTable")}
            >
              DISTANCE
            </button>
            <button
              className="orangeButton"
              onClick={e => this.handleButtonRow(e, "/caloriesTable")}
            >
              CALORIES
            </button>
            <button
              className="orangeButton"
              onClick={e => this.handleButtonRow(e, "/stepsTable")}
            >
              STEPS
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default ActivityTable;
