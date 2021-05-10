import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import DrawActivity from "../graphs/DrawActivity";
import { primaryOptions } from "../config/charts";
const loadData = () => import("../../data/fitbitData.csv");

const lineChartSplide = React.createRef();

class YearlyGraphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { year: 2015, years: [] };
    this.yearNames = [];
  }

  getYears = async () => {
    let dateArr = [];
    let range = [];
    return new Promise((resolve, reject) => {
      loadData().then(data => {
        for (let obj in data) {
          if (data[obj].Date && +data[obj].Date.substr(6, 4)) {
            dateArr.push(+data[obj].Date.substr(6, 4));
          }
        }

        let sortedYears = [...new Set(dateArr)].sort();

        this.yearNames = sortedYears;

        sortedYears.map((val1, ind) => {
          let yearsArr = [];
          for (let obj in data) {
            if (data[obj].Date && +data[obj].Date.substr(6, 4) === val1) {
              yearsArr.push([
                val1,
                +data[obj].Date.substr(3, 2),
                +data[obj].Date.substr(0, 2)
              ]);
            }
          }
          let months = yearsArr.map(val => {
            return val[1];
          });

          let min = Math.min(...months);
          let max = Math.max(...months);

          let startDays = yearsArr.reduce((acc, val) => {
            if (val[1] === min) {
              acc = acc.concat(val[2]);
            }
            return acc;
          }, []);

          let minDay = Math.min(...startDays);
          let endDays = yearsArr.reduce((acc, val) => {
            if (val[1] === max) {
              acc = acc.concat(val[2]);
            }
            return acc;
          }, []);
          let maxDay = Math.max(...endDays);

          range.push([[val1, min, minDay], [val1, max, maxDay]]);
        });
        resolve(range);
        reject("error with promise");
      });
    });
  };

  getWeeks = async (month, year) => {};

  componentDidMount() {
    let monthSplide = lineChartSplide.current;
    monthSplide.splide.on("moved", v => {
      this.setState({ year: this.yearNames[v] });
    });

    this.getYears().then(years => {
      this.setState({ years, year: this.yearNames[0] });
    });
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
          <span>{this.state.year}</span>
          <h2>Num of Minutes</h2>
          <span />
        </div>
        <Splide options={primaryOptions} ref={lineChartSplide}>
          {this.state.years.map((r, i) => (
            <SplideSlide key={`month${i}`}>
              <DrawActivity
                increment="years"
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
export default YearlyGraphs;
