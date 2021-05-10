import React, { useRef } from "react";
import * as d3 from "d3";
const loadData = () => import("../../data/fitbitData.csv");

const getData = async () => {
  try {
    let response = await loadData();
    return response;
  } catch (err) {
    console.log("error: ", err);
  }
};

const DrawActivity = ({ increment, id, range }) => {
  let linechart = useRef("linechart");
  if (linechart.current !== null) {
    while (linechart.current.firstChild)
      linechart.current.removeChild(linechart.current.firstChild);
  }

  let margin = { top: 20, right: 20, bottom: 30, left: 40 };
  let filteredData = [];
  let width = 260;
  let height = 260;
  let days = range[0][2];
  let earliestDate = range[0][2];
  let latestDate = range[1][2];
  let month = range[0][1];
  let year = range[0][0];
  let lineChartData = {};

  if (+days !== 0) {
    getData().then(data => {
      if (increment === "months") {
        for (let obj in data) {
          if (
            data[obj].Date &&
            +data[obj].Date.substr(3, 2) === +month &&
            +data[obj].Date.substr(6, 4) === year
          ) {
            filteredData.push({
              date: [
                +data[obj].Date.substr(6, 4),
                +data[obj].Date.substr(3, 2) - 1,
                +data[obj].Date.substr(0, 2)
              ],
              slowActivity: data[obj].SlowActivity,
              moderateActivity: data[obj].ModerateActivity,
              intenseActivity: data[obj].IntenseActivity
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
            filteredData.push({
              date: [
                +data[obj].Date.substr(6, 4),
                +data[obj].Date.substr(3, 2) - 1,
                +data[obj].Date.substr(0, 2)
              ],
              slowActivity: data[obj].SlowActivity,
              moderateActivity: data[obj].ModerateActivity,
              intenseActivity: data[obj].IntenseActivity
            });
          }
        }
      } else if (increment === "years") {
        for (let i = 1; i < 13; i++) {
          let slowActivity = 0;
          let moderateActivity = 0;
          let intenseActivity = 0;
          for (let obj in data) {
            if (
              data[obj].Date &&
              +data[obj].Date.substr(6, 4) === year &&
              +data[obj].Date.substr(3, 2) === i
            ) {
              slowActivity += +data[obj].SlowActivity;

              moderateActivity += +data[obj].ModerateActivity;

              intenseActivity += +data[obj].IntenseActivity;
            }
          }
          filteredData.push({
            date: [year, i, 1],
            slowActivity: slowActivity,
            moderateActivity: moderateActivity,
            intenseActivity: intenseActivity
          });
        }
      }

      let slowActivity = filteredData.reduce((acc, val) => {
        acc = acc.concat(val.slowActivity);
        return acc;
      }, []);

      let moderateActivity = filteredData.reduce((acc, val) => {
        acc = acc.concat(val.moderateActivity);
        return acc;
      }, []);

      let intenseActivity = filteredData.reduce((acc, val) => {
        acc = acc.concat(val.intenseActivity);
        return acc;
      }, []);

      let series = [
        { name: "slowActivity", values: slowActivity, color: "#EB8B23" },
        {
          name: "moderateActivity",
          values: moderateActivity,
          color: "#07A9E2"
        },
        { name: "intenseActivity", values: intenseActivity, color: "#000" }
      ];
      lineChartData.series = series;

      // D3 chart details

      let x;
      if (increment === "years") {
        x = d3
          .scaleTime()
          .domain([new Date(range[0][0], 0, 1), new Date(range[1][0], 11, 1)])
          .range([0, width]);
      } else {
        x = d3
          .scaleTime()
          .domain([
            new Date(range[0][0], +range[0][1] - 1, range[0][2]),
            new Date(range[1][0], +range[1][1] - 1, range[1][2])
          ])
          .range([0, width]);
      }

      let xAxis;

      if (increment === "months") {
        xAxis = g =>
          g.attr("transform", `translate(0,${height - margin.bottom})`).call(
            d3
              .axisBottom(x)
              .ticks(12)
              .tickFormat(d3.timeFormat("%d"))
          );
      } else if (increment === "years") {
        xAxis = g =>
          g.attr("transform", `translate(0,${height - margin.bottom})`).call(
            d3
              .axisBottom(x)
              .ticks(12)
              .tickFormat(d3.timeFormat("%b"))
          );
      } else if (increment === "weeks") {
        xAxis = g =>
          g.attr("transform", `translate(0,${height - margin.bottom})`).call(
            d3
              .axisBottom(x)
              .ticks(7)
              .tickFormat(d3.timeFormat("%d"))
          );
      }

      let y = d3
        .scaleLinear()
        .domain([0, d3.max(lineChartData.series, d => d3.max(d.values))])
        .range([height - margin.bottom, margin.top]);

      let yAxis = d3.axisLeft(y);

      let line;
      if (increment === "years") {
        line = d3
          .line()
          .defined(d => !isNaN(d))
          .x((d, i) => {
            return Math.round((i * width) / 12);
          })
          .y(d => Math.round(y(d)));
      } else {
        line = d3
          .line()
          .defined(d => !isNaN(d))
          .x((d, i) =>
            x(
              new Date(
                filteredData[i].date[0],
                filteredData[i].date[1],
                filteredData[i].date[2]
              )
            )
          )
          .y(d => y(d));
      }

      const svg = d3
        .select(`#${id}`)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const path = svg
        .append("g")
        .selectAll("path")
        .data(lineChartData.series)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", d => d.color)
        .attr("stroke-width", 1.0)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .style("mix-blend-mode", "multiply")
        .attr("d", d => line(d.values));

      svg
        .append("g")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("stroke-width", "1.0")
        .attr("transform", "rotate(-65)");

      svg.append("g").call(yAxis);
    });
  }

  if (+days === 0) {
    return <div className="linechart">No data available for this month</div>;
  } else {
    return <svg key="chartSVG" className="linechart" id={id} ref={linechart} />;
  }
};

export default DrawActivity;
