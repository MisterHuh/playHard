import React from "react";
import { RenderData } from "./renderData";
import { CurrencyFormatter } from "./currencyFormatter";

import Dropdown from "react-dropdown";
import 'react-dropdown/historyDropdown.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // search: {
      //   filterBy: "all",
      //   startDate: new Date(2019,11,29),
      //   endDate: new Date()
      // },

      filterBy: "All",
      startDate: new Date(2019, 11, 29),
      endDate: new Date(),
      query: "SELECT * FROM `2020` ORDER BY date DESC",
      order: "DESC",

      current: [],

      totalSpendings: 0,
      totalCredits: 0,
      totalFixed: 0,
      totalBudget: 0,
      totalRemaining: 0,

      currentWeekNumber: 0
    }
    this.retrieveAllData = this.retrieveAllData.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    // this.retrieveAllData2 = this.retrieveAllData2.bind(this);
    // this.retrieveSpendingsData = this.retrieveSpendingsData.bind(this);
    // this.retrieveCreditsData = this.retrieveCreditsData.bind(this);
    // this.retrieveFixedData = this.retrieveFixedData.bind(this);
    this.currentSummary = this.currentSummary.bind(this);
    // this.getTotalBudget = this.getTotalBudget.bind(this);
    this.categoryHandleChange = this.categoryHandleChange.bind(this);
    this.startDateHandleChange = this.startDateHandleChange.bind(this);
    this.endDateHandleChange = this.endDateHandleChange.bind(this);
    this.retrieveSearchData = this.retrieveSearchData.bind(this);

    this.extractQuery = this.extractQuery.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
  }

  sortByDate(order) {
    console.log("date button clicked");
    console.log("this.state.query is: ", this.state.query);
    console.log("this.state.currentWeekNumber is: ", this.state.currentWeekNumber);

  };

  // currentQuery(filterBy) {
  //   let currentQuery = ""
  //   if (filterBy === "All") {
  //     currentQuery = "SELECT * FROM `2020` WHERE Date between ";
  //   };

  //   let startDate = this.state.startDate;
  //   let endDate = this.state.endDate;

  // }

  extractQuery(current) {

    let query = current[0]["query"];
    let discard = current.shift();

    // let query = current.splice(0);
    console.log("extracted query is: ", query);
    console.log("new current is: ", current);
    this.setState({ query });
    this.setState({ current });
    this.currentSummary();
  };


  categoryHandleChange(e) {
    console.log("event.target.value is: ", e.target.value);
    let filterBy = e.target.value;
    this.setState({ filterBy });
  };

  startDateHandleChange(startDate) {
    this.setState({ startDate });
  };

  endDateHandleChange(endDate) {
    this.setState({ endDate });
  };

  retrieveSearchData() {
    let notFormattedStartDate = this.state.startDate;
    let formattedStartDate = notFormattedStartDate.getFullYear() + "-" + (notFormattedStartDate.getMonth() + 1) + "-" + notFormattedStartDate.getDate();

    let notFormattedEndDate = this.state.endDate;
    let formattedEndDate = notFormattedEndDate.getFullYear() + "-" + (notFormattedEndDate.getMonth() + 1) + "-" + notFormattedEndDate.getDate();

    const req = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: this.state.filterBy,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      })
    };

    this.searchQuery(req);

    // if (this.state.filterBy === "All") {
    //   this.retrieveAllData2(req);
    // } else if (this.state.filterBy === "Spendings") {
    //   this.retrieveSpendingsData(req);
    // } else if (this.state.filterBy === "Credits") {
    //   this.retrieveCreditsData(req);
    // } else if (this.state.filterBy === "Fixed") {
    //   this.retrieveFixedData(req);
    // }
  };

  searchQuery(req) {
    fetch(`/api/historySearchQuery.php`, req)
      .then(response => response.json())
      .then(current => {
        console.log("current is: ", current)

        this.setState({ current });
        this.currentSummary();
      })
  }

  retrieveAllData() {
    fetch(`/api/retrieveAllData.php`)
      .then(response => response.json())
      .then(current => {
        console.log("before extraction current is: ", current)
        this.extractQuery(current);
      })
      // .then(current => {
      //   console.log("after extraction current is: ", current);
      //   this.setState({ current });
      //   this.currentSummary();
      // })
  }

  getTotalBudget() {

    // let timestamp = new Date();
    // console.log("timestamp is: ", timestamp);

    // let sundayChecker = timestamp.getDay();
    // console.log("sundayChecker is: ", sundayChecker);

    // let currentWeek = require("current-week-number");
    // let currentWeekNumber;

    // if (sundayChecker === 0) {
    //   let followingDay = new Date(timestamp.getTime() + 86400000);
    //   console.log("followingDay is: ", followingDay);
    //   currentWeekNumber = currentWeek(followingDay);
    //   console.log("sundayChecker is 0");
    //   console.log("currentWeekNumber is: ", currentWeekNumber);
    // } else {
    //   currentWeekNumber = currentWeek(timestamp);
    //   console.log("sundayChecker is NOT 0");
    //   console.log("currentWeekNumber is: ", currentWeekNumber);
    // }

    // this.setState({ currentWeekNumber })

    let currentWeekNumber = this.props.currentWeekNumber;
    console.log("currentWeekNumber is: ", currentWeekNumber);
    this.setState({ currentWeekNumber })

  }

  currentSummary() {

    console.log("currentSummary fired");
    console.log("this.state.current is: ", this.state.current);
    console.log("this.state.query is: ", this.state.query);

    /* these 3 lines of code will probably replace getTotalBudget */
    /* is there too much happening here? */
    let currentWeekNumber = this.props.currentWeekNumber;
    console.log("currentWeekNumber is: ", currentWeekNumber);
    this.setState({ currentWeekNumber })

    let current = this.state.current;
    let length = current.length - 1;
    console.log("currentSummary length is: ", length);
    let totalSpendings = 0;
    let totalCredits = 0;
    let totalFixed = 0;
    let totalBudget = this.props.budget * this.state.currentWeekNumber;
    let totalRemaining = 0;

    for (let index = 0; index <= length; index++) {
      console.log("for loop staratd");
      if (current[index]["category"] == "Spendings") {
        totalSpendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Fixed") {
        totalFixed += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Credits") {
        totalCredits += parseFloat(current[index]["amount"]);
      }
    }

    totalSpendings = totalSpendings.toFixed(2);
    totalCredits = totalCredits.toFixed(2);
    totalFixed = totalFixed.toFixed(2);
    totalRemaining = totalBudget - totalCredits - totalSpendings;

    this.setState({
      totalSpendings,
      totalCredits,
      totalFixed,
      totalBudget,
      totalRemaining
    })
    // console.log("HISTORY VIEW totalBudget is: ", totalBudget);
    // console.log("HISTORY VIEW totalRemaining is: ", totalRemaining);
    // console.log("HISTORY VIEW this.state.current is: ", this.state.current)
  }

  componentDidMount() {
    this.retrieveAllData();
  }

  render() {

    const dropdownOptions = [
        { value: "All", name: "All"},
        { value: "Spendings", name: "Spendings" },
        { value: "Credits", name: "Credits" },
        { value: "Fixed", name: "Fixed" }
    ];

    const textCenter = {
      textAlignLast: "center"
    }

    return (

      <React.Fragment>
      <div className="currentWrapperTop border">

        {/* left */}
        <div className="currentSummaryContainer border border-primary">
          <div className="currentSummaryHistory">
            <div className="budget">Filter By</div>
            <div className="">Start Date</div>
            <div className="">End Date</div>
            <div
              onClick={() => this.retrieveAllData()}
              className="mt-3"
              >Reset
            </div>
          </div>

          <div className="currentSummaryHistory">

            <select
              onChange={this.categoryHandleChange}
              style={textCenter}
              className="historyDropdown"
              placeholder={this.state.filterBy} >
              {dropdownOptions.map((e, key) => {
                return <option key={key} value={e.value}>{e.name}</option>;
              })}
            </select>


            <div className="">
                <DatePicker
                  // selected={this.state.search.startDate}
                  selected={this.state.startDate}
                  name="startDate"
                  onChange={this.startDateHandleChange}
                  className="amount1"
                />
            </div>
            <div className="">
                <DatePicker
                  // selected={this.state.search.endDate}
                  selected={this.state.endDate}
                  name="endDate"
                  onChange={this.endDateHandleChange}
                  className="amount1"
                />
            </div>
            <div
              onClick={() => this.retrieveSearchData()}
              className="mt-3">Search</div>
          </div>
        </div>

        {/* middle */}
        <div className="currentSummaryContainer border border-primary">
          <div className="currentSummaryHistory">
            <div className="budget tooltipParent">
              Total Budget
              <span className="tooltipText">{"Current week is: " + this.state.currentWeekNumber}</span>
            </div>
            <div className="spendings">Total Spendings</div>
            <div className="credits">Total Credits</div>
            <div className="remaining mt-3">Total Remaining</div>
          </div>
          <div className="currentSummaryHistory">
            <div className="budget tooltipParent">
              {CurrencyFormatter.format(this.state.totalBudget)}
            </div>
            <div className="spendings">{CurrencyFormatter.format(this.state.totalSpendings)}</div>
            <div className="credits creditsFontColor">{CurrencyFormatter.format(this.state.totalCredits)}</div>
            <div className="remaining mt-3">{CurrencyFormatter.format(this.state.totalRemaining)}</div>
          </div>
        </div>

        {/* right */}
        <div className="currentSummaryContainer border border-primary">
          <div className="currentSummaryHistory">
            <div className="fixed">Groceries</div>
            <div className="fixed">Gas</div>
            <div className="fixed">Utilities</div>
            <div className="fixed mt-3">Total Remaining</div>
          </div>
          <div className="currentSummaryHistory">
            <div className="fixed">{CurrencyFormatter.format(this.state.totalBudget)}</div>
            <div className="fixed">{CurrencyFormatter.format(this.state.totalCredits)}</div>
            <div className="fixed">{CurrencyFormatter.format(this.state.totalFixed)}</div>
            <div className="fixed mt-3">{CurrencyFormatter.format(this.state.totalRemaining)}</div>
          </div>
        </div>

      </div>

        {/* <i className="icon fas fa-search-location border"></i> */}
        {/* <i className="icon fas fa-grin-hearts border"></i> */}
        {/* <i className="icon fas fa-hand-holding-usd border"></i> */}

        <div className="currentWrapperBottom">
          <div className="currentData">
            <div
              onClick={() => this.sortByDate()}
              className="currentDataHeader sortButton">Date</div>
            <div className="currentDataHeader">subCategory</div>
            <div className="currentDataHeader">cc</div>
            <div className="currentDataHeader">Amount</div>
            <div className="currentDataHeader">Store</div>
            <div className="currentDataHeader">Notes</div>
          </div>
          <RenderData current={this.state.current} />
        </div>

        </React.Fragment>

    )
  }
}
