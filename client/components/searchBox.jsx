import React from "react";
import { CurrencyFormatter } from "./currencyFormatter";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class SearchBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filterBy: "all",
      startDate: new Date(),
      endDate: new Date()
    }
    this.categoryHandleChange = this.categoryHandleChange.bind(this)
}

  categoryHandleChange(e) {
    // console.log("event is: ", e);
    // console.log("event.value is: ", e.value);
    this.setState({ view: e.value })
  }

  componentDidMount() {
    console.log("this.state.filterBy is: ", this.state.filterBy)
  }

  render() {

    const dropdownOptions = [
      { value: "all", name: "All" },
      { value: "spendings", name: "Spendings" },
      { value: "credits", name: "Credits" },
      { value: "fixed", name: "Fixed" }
    ];

    return (
      <div className="currentSummaryContainer border border-primary">

        <div className="currentSummary">
          <div className="budget">Filter By</div>
          <div className="">Start Date</div>
          <div className="">End Date</div>
          <div className="">Reset</div>
        </div>

        <div className="currentSummary">

          <select
            onChange={this.categoryHandleChange}
            className="historyDropdown" >
            {dropdownOptions.map((e, key) => {
              return <option key={key} value={e.value}>{e.name}</option>;
            })}
          </select>

          <div className="">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.dateHandleChange}
              className="amount1"
            />
          </div>

          <div className="">
            <DatePicker
              selected={this.state.endDate}
              onChange={this.dateHandleChange}
              className="amount1"
            />
          </div>

          <div className="">Search</div>

        </div>

      </div>
    )
  }
}
