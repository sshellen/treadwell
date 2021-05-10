import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import DrawBarCharts from "../graphs/DrawBarCharts";
import { monthNames, monthsToMatch, primaryOptions } from "../config/charts";
const loadData = () => import("../../data/fitbitData.csv");

const barChartSplide = React.createRef();

class MonthlyGraphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { month: "", months: [] };
  }

  getMonths = async year => {
    let dateArr = [];
    let range = [];
    return new Promise((resolve, reject) => {
      loadData().then(data => {
        for (let obj in data) {
          if (data[obj].Date && +data[obj].Date.substr(6, 4) === +year) {
            dateArr.push(data[obj].Date);
          }
        }

        monthsToMatch.map(val => {
          let regex = new RegExp(`${val}`, "g");
          let monthCount = dateArr.filter(arr => {
            return arr.match(regex);
          });
          range.push([
            [+year, +val.replaceAll("-", ""), monthCount.length > 0 ? 1 : 0],
            [+year, +val.replaceAll("-", ""), +monthCount.length.toString()]
          ]);
        });

        resolve(range);
        reject("error with promise");
      });
    });
  };

  componentDidMount() {
    let monthSplide = barChartSplide.current;
    monthSplide.splide.on("moved", v => {
      this.setState({ month: monthNames[v] });
    });

    this.getMonths(this.props.year).then(months => {
      this.setState({ months });
    });
    this.setState({ month: "JAN" });
  }

  componentDidUpdate(prev) {
    if (this.props.year !== prev.year) {
      this.getMonths(this.props.year).then(months => {
        this.setState({ months });
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
          <span>{this.state.month}</span>
          <h2>Num of Miles</h2>
          <span className="rightSide">{year}</span>
        </div>
        <Splide options={primaryOptions} ref={barChartSplide}>
          {this.state.months.map((r, i) => (
            <SplideSlide key={`month${i}`}>
              <DrawBarCharts
                increment="months"
                type="Distance"
                id={`barChart${i}`}
                range={r}
                barColor={barColor}
                textColor={textColor}
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    );
  }
}
export default MonthlyGraphs;
