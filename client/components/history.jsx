import React from "react";
import { RenderData } from "./renderData";
import { CurrencyFormatter } from "./currencyFormatter";

import Dropdown from "react-dropdown";
import 'react-dropdown/historyDropdown.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

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
      // startDate: new Date(2020, 0, 31),
      endDate: new Date(),
      query: "SELECT * FROM `2020` ORDER BY date DESC",
      order: "DESC",

      current: [],
      // activePage: 20,

      /* pagination */
      users: null, // data you loop over => this.state.current
      total: null, // helps with calculating page logic => this.state.current.length
      per_page: null, // helps with calculating page logic => 20
      current_page: null, // style the active pagination link => 1

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
    this.deleteEntry = this.deleteEntry.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.currentSummary = this.currentSummary.bind(this);
    this.categoryHandleChange = this.categoryHandleChange.bind(this);
    this.startDateHandleChange = this.startDateHandleChange.bind(this);
    this.endDateHandleChange = this.endDateHandleChange.bind(this);
    this.retrieveSearchData = this.retrieveSearchData.bind(this);

    this.extractQueryAndOrder = this.extractQueryAndOrder.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.querySummary = this.querySummary.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
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
    // console.log("event.target.value is: ", e.target.value);
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

    // console.log("formattedStartDate is: ", formattedStartDate);
    // console.log("formattedEndDate is: ", formattedEndDate);

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
        console.dir(current);
        this.setState({
          current,
          total: current.length
         });
        this.currentSummary();
      })
  }

  deleteEntry(id) {
    let entryId = id;

    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({entryId})
    };
    fetch(`/api/deleteEntry.php`, req)
      .then(response => response.json())
      .catch(error => {

      });
    this.retrieveAllData();

  }

  querySummary() {

    let queryWeekNumber = this.state.queryWeekNumber;

    let current = this.state.current;
    let length = current.length;

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

    // console.log("current.length is: ", current.length);

    for (let index = 0; index < length; index++) {
      // console.log("id is: ", current[index]["id"] )
      console.log("index is: ", index)
      console.log("length is: ", length);

      // if (current[index]["id"] === 31) {
      //   console.log("31 is: ", current[index]);
      // }

      if (current[index]["category"] === "Spendings") {
        totalSpendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] === "Credits") {
        totalCredits += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] === "Fixed") {
        if (current[index]["subcategory"] === "Groceries") {
          totalGroceries += parseFloat(current[index]["amount"]);
        } else if (current[index]["subcategory"] === "Gas") {
          // console.log("Gas is: ", current[index]["amount"] );
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

    console.log("currentWeekNumber is: ", currentWeekNumber);

    let current = this.state.current;

    let totalSpendings = 0;
    let totalCredits = 0;
    let totalBudget = this.props.budget * currentWeekNumber;
    console.log("this.props.budget is: ", this.props.budget);
    console.log("totalBudget is: ", totalBudget);
    let totalRemaining = 0;

    let totalFixed = 0;
    let totalGroceries = 0;
    let totalGas = 0;
    let totalFixedEtc = 0;

    for (let index = 0; index < current.length; index++) {
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
  }

  render() {

    const dropdownOptions = [
        { value: "All", name: "All"},
        { value: "Spendings", name: "Spendings" },
        { value: "Credits", name: "Credits" },
        { value: "Fixed", name: "Fixed" },
        { value: "Wedding", name: "Wedding" }
    ];

    const textCenter = {
      textAlignLast: "center"
    }

    return (

      <React.Fragment>
        <div className="currentWrapperTop">

          {/* <table id="tabla" className="currentSummaryContainer">
            <tbody>

              <tr className="borderTest remaining">
                <th>Total Budget</th><td>Budget Value</td>
              </tr>

              <tr className="borderTest spendings">
                <th>Total Spendings</th><td>Spendings Value</td>
                </tr>

              <tr className="borderTest credits">
                <th>Total Credits</th><td>Credits Value</td>
                </tr>

              <tr className="borderTest ">
                <th>Total Remaining</th><td>Remaining Value</td>
                </tr>

            </tbody>
          </table> */}


          <table id="tabla" className="currentSummaryContainer">
            <tbody>

              <tr className="borderTest">
                <th>Filter By</th>
                <td>
                  <select
                    onChange={this.categoryHandleChange}
                    style={textCenter}
                    className="historyDropdown"
                    placeholder={this.state.filterBy} >
                    {dropdownOptions.map((e, key) => {
                      return <option key={key} value={e.value}>{e.name}</option>;
                    })}
                  </select>
                </td>
              </tr>

              <tr className="borderTest ">
                <th>Start Date</th>
                <td>
                  <div className="">
                    <DatePicker
                      // selected={this.state.search.startDate}
                      selected={this.state.startDate}
                      name="startDate"
                      onChange={this.startDateHandleChange}
                      className="amount1"
                    />
                  </div>
                </td>
              </tr>

              <tr className="borderTest ">
                <th>End Date</th>
                <td>
                  <div className="">
                    <DatePicker
                      selected={this.state.endDate}
                      name="endDate"
                      onChange={this.endDateHandleChange}
                      className="amount1"
                    />
                  </div>
                </td>
              </tr>

              <tr className="borderTest ">
                <th onClick={() => this.retrieveAllData()}>Reset</th>
                <td onClick={() => this.retrieveSearchData()}>Search</td>
              </tr>

            </tbody>
          </table>

          {/* left */}
          {/* <div className="currentSummaryContainer">
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
          </div> */}

          <table id="tabla" className="currentSummaryContainer">
            <tbody>

              <tr className="borderTest remaining">
                <th>Total Budget</th>
                <td>{CurrencyFormatter.format(this.state.totalBudget)}</td>
              </tr>

              <tr className="borderTest spendings">
                <th>Total Spendings</th>
                <td>{CurrencyFormatter.format(this.state.totalSpendings)}</td>
              </tr>

              <tr className="borderTest credits">
                <th>Total Credits</th>
                <td>{CurrencyFormatter.format(this.state.totalCredits)}</td>
              </tr>

              <tr className="borderTest ">
                <th>Total Remaining</th>
                <td>{CurrencyFormatter.format(this.state.totalRemaining)}</td>
              </tr>

            </tbody>
          </table>

          {/* middle */}

          <table id="tabla" className="currentSummaryContainer">
            <tbody>

              <tr className="borderTest spendings">
                <th>Total Budget</th>
                <td>{CurrencyFormatter.format(this.state.totalBudget)}</td>
              </tr>

              <tr className="borderTest spendings">
                <th>Total Spendings</th>
                <td>{CurrencyFormatter.format(this.state.totalSpendings)}</td>
              </tr>

              <tr className="borderTest spendings">
                <th>Total Credits</th>
                <td>{CurrencyFormatter.format(this.state.totalCredits)}</td>
              </tr>

              <tr className="borderTest ">
                <th>Total Remaining</th>
                <td>{CurrencyFormatter.format(this.state.totalRemaining)}</td>
              </tr>

            </tbody>
          </table>

          {/* <div className="currentSummaryContainer">
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
          </div> */}

          {/* right */}

          <table id="tabla" className="currentSummaryContainer">
            <tbody>

              <tr className="borderTest fixed">
                <th>Groceries</th>
                <td>{CurrencyFormatter.format(this.state.totalGroceries)}</td>
              </tr>

              <tr className="borderTest fixed">
                <th>Gas</th>
                <td>{CurrencyFormatter.format(this.state.totalGas)}</td>
              </tr>

              <tr className="borderTest fixed">
                <th>ETC</th>
                <td>{CurrencyFormatter.format(this.state.totalFixedEtc)}</td>
              </tr>

              <tr className="borderTest">
                <th>Total Fixed</th>
                <td>{CurrencyFormatter.format(this.state.totalFixed)}</td>
              </tr>

            </tbody>
          </table>

          {/* <div className="currentSummaryContainer">

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
          </div> */}

        </div>

        {/* <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.current.length}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange.bind(this)}
        /> */}

        {/* <div className="">
          <span>&laquo;</span>
          <span className="">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>&raquo;</span>
        </div> */}


        <div className="currentWrapperBottom">
          <div className="currentData">
            <div className="currentDataHeader">
                Date

              <i
                onClick={() => this.props.deleteEntry()}
                className="fas fa-sort-up">
              </i>

              <i
                onClick={() => this.sortByDate()}
                className="fas fa-chevron-up border">
              </i>

              <i
                onClick={() => this.sortByDate()}
                className="fas fa-angle-up border">
              </i>

              <i
                onClick={() => this.sortByDate()}
                className="fas fa-caret-square-up">
              </i>
            </div>

            <div className="currentDataHeader">subCategory</div>
            <div className="currentDataHeader">cc</div>
            <div className="currentDataHeader">Amount</div>
            <div className="currentDataHeader">Store</div>
            <div className="currentDataHeader">Notes</div>
          </div>

          <React.Fragment>
            {this.state.current.map(entry => {
                return (
                  <RenderData
                    current={this.state.current}
                    entry={entry}
                    key={entry["id"]}
                    deleteEntry={this.deleteEntry}
                  />
                )
              })
            }
          </React.Fragment>

        </div>

      </React.Fragment>

    )
  }
}
