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
      // startDate: new Date(2019, 11, 29),
      startDate: new Date(2020, 0, 31),
      endDate: new Date(),
      query: "SELECT * FROM `2020` ORDER BY date DESC",
      order: "DESC",

      current: [],

      totalSpendings: 0,
      totalCredits: 0,
      totalBudget: 0,
      totalRemaining: 0,

      totalFixed: 0,
      totalGroceries: 0,
      totalGas: 0,
      totalFixedEtc: 0,

      currentWeekNumber: 0,
      queryWeekNumber: 0

    }
    this.retrieveAllData = this.retrieveAllData.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.currentSummary = this.currentSummary.bind(this);
    this.categoryHandleChange = this.categoryHandleChange.bind(this);
    this.startDateHandleChange = this.startDateHandleChange.bind(this);
    this.endDateHandleChange = this.endDateHandleChange.bind(this);
    this.retrieveSearchData = this.retrieveSearchData.bind(this);

    this.extractQueryAndOrder = this.extractQueryAndOrder.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.querySummary = this.querySummary.bind(this);
  }

  sortByDate() {
    console.log("sortByDate fired");

    let beforeQuery = this.state.query.split("date");
    let afterQuery = beforeQuery[0];
    let currentOrder = this.state.order;

    if (currentOrder === "ASC") {
      currentOrder = "DESC";
    };
    if (currentOrder === "DESC") {
      currentOrder = "ASC";
    };

    let query = afterQuery + currentOrder;
    console.log("query is: ", query);

    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query })
    };

    fetch(`/api/sortByDate.php`, req)
      .then(response => response.json())
      .then(current => {
        console.log("current is: ", current)

        this.setState({ current });
        this.currentSummary();
      })

  }

  // need to update both state.query and state.order here;
  // then write a click handler to sort everything out;
  extractQueryAndOrder(current) {

    let query = current[0]["query"]; // extracts the first row
    let discard = current.shift();

    let beforeQuery = this.state.query.split("date");
    let afterQuery = beforeQuery[0];
    let order = beforeQuery[1].replace(/ /g, "");
    console.log("beforeQuery is: ", beforeQuery);
    console.log("afterQuery is: ", afterQuery);
    console.log("order is: ", order);
    console.log("current is: ", current);

    this.setState({
      query, current, order
    });

    this.currentSummary(); // calculates middleTable;
    // this.setState({ query }); // updates this.state.query for toggling. last query used
    // this.setState({ current }); // updates this.state.current so currentSummary() could run
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

    let notFormattedDateDiff = new Date(formattedStartDate) - new Date(formattedEndDate)
    let notFormattedQueryWeekNumber = notFormattedDateDiff / (-1000 * 3600 * 24);

    let modulusTest = notFormattedQueryWeekNumber % 7
    let divisionTest = notFormattedQueryWeekNumber / 7
    let queryWeekNumber;

    if (!modulusTest) {
      queryWeekNumber = divisionTest;
    } else {
      queryWeekNumber = Math.ceil(divisionTest);
    };

    this.setState({ queryWeekNumber });
    this.searchQuery(req);

  };

  searchQuery(req) {
    fetch(`/api/historySearchQuery.php`, req)
      .then(response => response.json())
      .then(current => {
        console.log("current is: ", current)

        this.setState({ current });
        this.querySummary();
      })
  }

  retrieveAllData() {
    fetch(`/api/retrieveAllData.php`)
      .then(response => response.json())
      .then(current => {
        this.extractQueryAndOrder(current);
      })
  }

  querySummary() {

    let queryWeekNumber = this.state.queryWeekNumber;

    let current = this.state.current;
    let length = current.length - 1;

    let totalSpendings = 0;
    let totalCredits = 0;
    let totalBudget = this.props.budget * this.state.queryWeekNumber;
    let totalRemaining = 0;

    // console.log("queryWeekNumber is: ", this.state.queryWeekNumber);
    // console.log("totalBudget is: ", totalBudget);

    let totalFixed = 0;
    let totalGroceries = 0;
    let totalGas = 0;
    let totalFixedEtc = 0;

    for (let index = 0; index < length; index++) {
      if (current[index]["category"] === "Spendings") {
        totalSpendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] === "Credits") {
        totalCredits += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] === "Fixed") {
        if (current[index]["subcategory"] === "Groceries") {
          totalGroceries += parseFloat(current[index]["amount"]);
        } else if (current[index]["subcategory"] === "Gas") {
          totalGas += parseFloat(current[index]["amount"]);
        } else if (current[index]["subcategory"] === "Utility" || current[index]["subcategory"] === "Health" || current[index]["subcategory"] === "Entertainment") {
          totalFixedEtc += parseFloat(current[index]["amount"]);
        };
        totalFixed += parseFloat(current[index]["amount"]);
      }
    }

    totalSpendings = totalSpendings.toFixed(2);
    totalCredits = totalCredits.toFixed(2);
    totalFixed = totalFixed.toFixed(2);
    totalRemaining = totalBudget - totalCredits - totalSpendings;

    this.setState({
      totalSpendings,
      totalCredits,
      totalBudget,
      totalRemaining,
      totalFixed,
      totalGroceries,
      totalGas,
      totalFixedEtc
    })
  }

/* is there too much happening here? */
  currentSummary() {

    let currentWeekNumber = this.props.currentWeekNumber;
    this.setState({ currentWeekNumber })

    let current = this.state.current;
    let length = current.length - 1;

    let totalSpendings = 0;
    let totalCredits = 0;
    let totalBudget = this.props.budget * this.state.currentWeekNumber;
    let totalRemaining = 0;

    let totalFixed = 0;
    let totalGroceries = 0;
    let totalGas = 0;
    let totalFixedEtc = 0;

    for (let index = 0; index < length; index++) {
      if (current[index]["category"] === "Spendings") {
        totalSpendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] === "Credits") {
        totalCredits += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] === "Fixed") {
        if (current[index]["subcategory"] === "Groceries") {
          totalGroceries += parseFloat(current[index]["amount"]);
        } else if (current[index]["subcategory"] === "Gas") {
          totalGas += parseFloat(current[index]["amount"]);
        } else if (current[index]["subcategory"] === "Utility" || current[index]["subcategory"] === "Health" || current[index]["subcategory"] === "Entertainment") {
          totalFixedEtc += parseFloat(current[index]["amount"]);
        };
        totalFixed += parseFloat(current[index]["amount"]);
      }
    }

    totalSpendings = totalSpendings.toFixed(2);
    totalCredits = totalCredits.toFixed(2);
    totalFixed = totalFixed.toFixed(2);
    totalRemaining = totalBudget - totalCredits - totalSpendings;

    this.setState({
      totalSpendings,
      totalCredits,
      totalBudget,
      totalRemaining,
      totalFixed,
      totalGroceries,
      totalGas,
      totalFixedEtc
    })
  }

  componentDidMount() {
    this.retrieveAllData();
    console.log("this.state.order is: ", this.state.order);
    console.log("this.state.query is: ", this.state.query);
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
              <div className="budget remaining tooltipParent">
              Total Budget
              <span className="tooltipText">{"Current week is: " + this.state.currentWeekNumber}</span>
            </div>
            <div className="spendings">Total Spendings</div>
            <div className="credits">Total Credits</div>
            <div className="mt-3">Total Remaining</div>
          </div>
          <div className="currentSummaryHistory">
              <div className="budget remaining tooltipParent">
              {CurrencyFormatter.format(this.state.totalBudget)}
            </div>
            <div className="spendings">{CurrencyFormatter.format(this.state.totalSpendings)}</div>
            <div className="credits creditsFontColor">{CurrencyFormatter.format(this.state.totalCredits)}</div>
            <div className="mt-3">{CurrencyFormatter.format(this.state.totalRemaining)}</div>
          </div>
        </div>

        {/* right */}
        <div className="currentSummaryContainer border border-primary">
          <div className="currentSummaryHistory">
            <div className="fixed">Groceries</div>
            <div className="fixed">Gas</div>
            <div className="fixed tooltipParent">
              Etc
                <span className="tooltipText">Utilities & Entertainment</span>
            </div>
            <div className="mt-3">Total Fixed</div>
          </div>
          <div className="currentSummaryHistory">
            <div className="fixed">{CurrencyFormatter.format(this.state.totalGroceries)}</div>
            <div className="fixed">{CurrencyFormatter.format(this.state.totalGas)}</div>
            <div className="fixed">{CurrencyFormatter.format(this.state.totalFixedEtc)}</div>
            <div className="mt-3">{CurrencyFormatter.format(this.state.totalFixed)}</div>
          </div>
        </div>

      </div>

        {/* <i className="icon fas fa-search-location border"></i> */}
        {/* <i className="icon fas fa-grin-hearts border"></i> */}
        {/* <i className="icon fas fa-hand-holding-usd border"></i> */}

        <div className="currentWrapperBottom">
          <div className="currentData">
            <div className="currentDataHeader">
                Date

                <i
                onClick={() => this.sortByDate()}
                className="fas fa-sort-up"></i>

                <i
                  onClick={() => this.sortByDate()}
                  className="fas fa-chevron-up border"
                ></i>

              <i
                onClick={() => this.sortByDate()}
                className="fas fa-angle-up border"
              ></i>

              <i
                onClick={() => this.sortByDate()}
                className="fas fa-caret-square-up"
              ></i>

            </div>
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
