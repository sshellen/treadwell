import React, { useRef } from "react";
import * as d3 from "d3";
const loadData = () => import("../../data/fitbitData.csv");

const getData = async () => {
  let response = null;
  try {
    response = await loadData();
    return response;
  } catch (err) {
    console.log("error: ", err);
  }
};

const convertToFloat = val => {
  val = val.toString();
  let str =
    val.substr(0, val.length - 2) +
    "." +
    val.substr(val.length - 2, val.length);

  return parseFloat(str);
};
const DrawBarCharts = ({ increment, id, type, range, barColor, textColor }) => {
  let barchart = useRef("barchart");
  if (barchart.current !== null) {
    while (barchart.current.firstChild)
      barchart.current.removeChild(barchart.current.firstChild);
  }

  let margin = { top: 20, right: 20, bottom: 30, left: 50 };
  let padding = { right: 1 };
  let filteredData = [];
  let width = 200;
  let height = 250;
  let days = range[0][2];
  let earliestDate = range[0][2];
  let latestDate = range[1][2];
  let month = range[0][1];
  let year = range[0][0];

  if (+days !== 0) {
    getData().then(data => {
      if (increment === "months") {
        for (let obj in data) {
          if (
            data[obj].Date &&
            +data[obj].Date.substr(3, 2) === +month &&
            +data[obj].Date.substr(6, 4) === year
          ) {
            if (type === "Distance") {
              units = convertToFloat(data[obj].Distance);
            } else {
              units = data[obj][type];
            }
            filteredData.push({
              [type]: units,
              Date:
                "'" +
                +data[obj].Date.substr(6, 4) +
                "," +
                +data[obj].Date.substr(3, 2) -
                1 +
                "," +
                +data[obj].Date.substr(0, 2) +
                "'"
            });
          }
        }
      } else if (increment === "weeks") {
        for (let obj in data) {
          if (
            data[obj].Date &&
            +data[obj].Date.substr(3, 2) === +month &&
            +data[obj].Date.substr(6, 4) === year &&
            +data[obj].Date.substr(0, 2) <= latestDate &&
            data[obj].Date.substr(0, 2) >= earliestDate
          ) {
            if (type === "Distance") {
              units = convertToFloat(data[obj].Distance);
            } else {
              units = data[obj][type];
            }
            filteredData.push({
              [type]: units,
              Date:
                "'" +
                +data[obj].Date.substr(6, 4) +
                "," +
                +data[obj].Date.substr(3, 2) -
                1 +
                "," +
                +data[obj].Date.substr(0, 2) +
                "'"
            });
          }
        }
      } else if (increment === "years") {
        for (let i = 1; i < 13; i++) {
          let units = 0;
          for (let obj in data) {
            if (
              data[obj].Date &&
              +data[obj].Date.substr(6, 4) === year &&
              +data[obj].Date.substr(3, 2) === i
            ) {
              if (type === "Distance") {
                units += convertToFloat(data[obj].Distance);
              } else {
                units += data[obj][type];
              }
            }
          }
          filteredData.push({ [type]: units, Date: `${year},${i - 1}` });
        }
      }

      let units = filteredData.reduce((acc, val) => {
        acc = acc.concat(val[type]);

        return acc;
      }, []);

      let barWidth = Math.ceil(width / filteredData.length);

      let chart = d3
        .select(`#${id}`)
        .attr(
          "width",
          width +
            margin.right +
            margin.left +
            padding.right * filteredData.length
        )
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      let y = d3
        .scaleLinear()
        .domain([0, d3.max(units)])
        .range([height, 0]);

      let x;
      if (increment === "years") {
        x = d3
          .scaleTime()
          .domain([new Date(range[0][0], 0, 1), new Date(range[1][0], 11, 1)])
          .range([0, width + padding.right * filteredData.length]);
      } else {
        x = d3
          .scaleTime()
          .domain([
            new Date(range[0][0], +range[0][1] - 1, range[0][2]),
            new Date(range[1][0], +range[1][1] - 1, range[1][2])
          ])
          .range([0, width + padding.right * filteredData.length]);
      }

      let xAxis;
      if (increment === "years") {
        xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%b"));
      } else {
        xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%d"));
      }

      let yAxis = d3.axisLeft(y).ticks(10);

      let g = chart
        .selectAll("g")
        .data(filteredData)
        .enter()
        .append("g");

      g.append("rect")
        .attr("y", d => Math.floor(y(d[type])))
        .attr("x", (d, i) => i * (barWidth + padding.right))
        .style("height", d => height - Math.floor(y(d[type])) + "px")
        .style("width", barWidth + "px")
        .style("fill", barColor);

      chart
        .append("g")
        .attr("class", "x axis")
        .style("color", textColor)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      chart
        .append("g")
        .attr("class", "y axis")
        .style("color", textColor)
        .call(yAxis);
    });
  }
  if (+days === 0) {
    return <div className="barchart">No data available for this month</div>;
  } else {
    return <svg key="chartSVG" className="barchart" id={id} ref={barchart} />;
  }
};

export default DrawBarCharts;
