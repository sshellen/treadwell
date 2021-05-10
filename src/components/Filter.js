import React from "react";
import { monthNames } from "../config/charts";

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.itemInput = React.createRef();
    this.state = {
      showMenu: "",
      year: 2015,
      month: "JAN"
    };

    this.app = document.getElementById("app");
  }

  selectMonth = (e, btn) => {
    this.setState({ month: monthNames[e.target.value - 1] });
  };

  selectYear = (e, btn) => {
    this.setState({ year: e.target.value });
  };

  componentDidMount() {
    this.chunk = document.getElementsByTagName("section")[0];
  }
  render() {
    const { filterType, handleYear, handleMonth } = this.props;
    return (
      <div className="filter">
        <span>Showing results for:&nbsp;</span>
        <form name="yearForm" onSubmit={() => false}>
          {filterType !== "years" && (
            <select
              className="filterBtn"
              onChange={e => {
                this.selectYear(e, "");
                handleYear(e.target.value);
              }}
            >
              <option val={2015} defaultValue="selected">
                2015
              </option>
              <option val={2016}>2016</option>
            </select>
          )}
          {filterType === "weeks" && (
            <select
              className="filterBtn"
              onChange={e => {
                this.selectMonth(e, "");
                handleMonth(e.target.value);
              }}
            >
              <option value={1} defaultValue="selected">
                JAN
              </option>
              <option value={2}>FEB</option>
              <option value={3}>MAR</option>
              <option value={4}>APR</option>
              <option value={5}>MAY</option>
              <option value={6}>JUN</option>
              <option value={7}>JUL</option>
              <option value={8}>AUG</option>
              <option value={9}>SEP</option>
              <option value={10}>OCT</option>
              <option value={11}>NOV</option>
              <option value={12}>DEC</option>
            </select>
          )}
        </form>
        {filterType === "years" && <span>All years</span>}
      </div>
    );
  }
}

export default Filter;
