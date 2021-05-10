import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import DrawActivity from "../graphs/DrawActivity";
import {
  monthNames,
  weeksToMatch,
  primaryOptions,
  weekNames
} from "../config/charts";
const loadData = () => import("../../data/fitbitData.csv");

const lineChartSplide = React.createRef();

class WeeklyGraphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { year: 2015, month: 1, weeks: [], week: "" };
  }

  getWeeks = async (year, month) => {
    let dateArr = [];
    let range = [];
    return new Promise((resolve, reject) => {
      loadData().then(data => {
        for (let obj in data) {
          if (
            data[obj].Date &&
            +data[obj].Date.substr(6, 4) === +year &&
            +data[obj].Date.substr(3, 2) === +month
          ) {
            dateArr.push(+data[obj].Date.substr(0, 2));
          }
        }

        weeksToMatch.map((val1, ind) => {
          if (val1 !== 31) {
            let weekCount = dateArr.filter(val2 => {
              return val2 > val1 && val2 <= weeksToMatch[ind + 1];
            });

            if (weekCount.length === 0) {
              range.push([[+year, +month, 0], [+year, +month, 0]]);
            } else {
              range.push([
                [+year, +month, Math.min(...weekCount)],
                [+year, +month, Math.max(...weekCount)]
              ]);
            }
          }
        });

        resolve(range);
        reject("error with promise");
      });
    });
  };

  componentDidMount() {
    let weekSplide = lineChartSplide.current;
    weekSplide.splide.on("moved", v => {
      this.setState({ week: weekNames[v] });
    });

    this.getWeeks(this.props.year, this.props.month).then(weeks => {
      this.setState({
        week: "Week 1",
        weeks,
        month: monthNames[+this.props.month - 1]
      });
    });
  }

  componentDidUpdate(prev) {
    if (this.props.year !== prev.year) {
      this.getWeeks(this.props.year, this.props.month).then(weeks => {
        this.setState({ year: this.props.year, weeks });
      });
    }
    if (this.props.month !== prev.month) {
      this.getWeeks(this.props.year, this.props.month).then(weeks => {
        this.setState({ weeks, month: monthNames[+this.props.month - 1] });
      });
    }
  }

  render() {
    const {
      frequency = null,
      year = null,
      month = null,
      barColor = "#0087B4",
      textColor = "#000"
    } = this.props;

    return (
      <div className="graph">
        <div className="graphsHeader">
          <span>{this.state.week}</span>
          <h2>Num of Minutes</h2>
          <span className="rightSide">{this.state.month}</span>
        </div>
        <Splide options={primaryOptions} ref={lineChartSplide}>
          {this.state.weeks.map((r, i) => (
            <SplideSlide key={`week${i}`}>
              <DrawActivity increment="weeks" id={`barChart${i}`} range={r} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    );
  }
}
export default WeeklyGraphs;
