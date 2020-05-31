import React from "react";
import { Accordion } from "./accordion";
import { RenderData } from "./renderData";
import { CurrencyFormatter, TotalSummary, GetCurrentWeekNum } from "./helperFunctions";

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
      //   categoryFilter: "all",
      //   startDate: new Date(2019,11,29),
      //   endDate: new Date()
      // },

      categoryFilter: "All",
      ccFilter: "All",
      startDate: new Date(2019, 11, 29),
      endDate: new Date(),
      query: "SELECT * FROM `2020` ORDER BY date DESC",
      order: "DESC",

      current: [],

      // for accordion
      spendingsDisplay: true,
      creditsDisplay: true,
      fixedDisplay: true,

      /* pagination */
      // activePage: 20,
      // users: null, // data you loop over => this.state.current
      // total: null, // helps with calculating page logic => this.state.current.length
      // per_page: null, // helps with calculating page logic => 20
      // current_page: null, // style the active pagination link => 1

      totalTestSpendings: {
        total: 0,
        food: 0,
        home: 0,
        gifts: 0,
        travel: 0,
        entertainment: 0,
        dogs: 0
      },

      totalTestCredits: {
        total: 0,
        food: 0,
        home: 0,
        gifts: 0,
        travel: 0,
        entertainment: 0,
        dogs: 0
      },

      totalTestFixed: {
        total: 0,
        groceries: 0,
        gas: 0,
        fixedEtc: 0,
      },

      others: {
        totalRemaining: 0,
        budget: 0
      },

      totalSpendings: 0,
      totalFoodSpendings: 0,
      totalHomeSpendings: 0,
      totalGiftsSpendings: 0,
      totalTravelSpendings: 0,
      totalEntertainmentSpendings: 0,
      totalDogSpendings: 0,

      spendingsFoodPercent: 0,
      spendingsHomePercent: 0,
      spendingsGiftPercent: 0,
      spendingsTravelPercent: 0,
      totalEntertainmentPercent: 0,
      spendingsDogPercent: 0,

      totalCredits: 0,
      totalFoodCredits: 0,
      totalHomeCredits: 0,
      totalGiftCredits: 0,
      totalTravelCredits: 0,
      totalEntertainmentCredits: 0,
      totalDogCredits: 0,

      creditsFoodPercent: 0,
      creditsHomePercent: 0,
      creditsGiftPercent: 0,
      creditsTravelPercent: 0,
      creditsEntertainmentPercent: 0,
      creditsDogPercent: 0,

      toggleTotalSpendingsDisplay: false,
      toggleTotalCreditsDisplay: false,
      toggleTotalFixedDisplay: false,

      totalBudget: 0,
      totalRemaining: 0,

      totalFixed: 0,
      totalGroceries: 0,
      totalGas: 0,
      totalFixedEtc: 0,

      week: {
        currentWeekNumber: 0,
        queryWeekNumber: 0
      }

    }

    this.retrieveAllData = this.retrieveAllData.bind(this);
    this.setWeek = this.setWeek.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.categoryHandleChange = this.categoryHandleChange.bind(this);
    this.ccHandleChange = this.ccHandleChange.bind(this);
    this.startDateHandleChange = this.startDateHandleChange.bind(this);
    this.endDateHandleChange = this.endDateHandleChange.bind(this);
    this.retrieveSearchData = this.retrieveSearchData.bind(this);

    this.extractQueryAndOrder = this.extractQueryAndOrder.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.querySummary = this.querySummary.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
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
        this.querySummary();
        // this.currentSummary();
      })

  }

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

    // this.currentSummary();
    // this.setState({ query }); // updates this.state.query for toggling. last query used
    // this.setState({ current }); // updates this.state.current so currentSummary() could run
  };

  categoryHandleChange(e) {
    let categoryFilter = e.target.value;
    this.setState({ categoryFilter });
  };

  ccHandleChange(e) {
    let ccFilter = e.target.value;
    this.setState({ ccFilter });
  }

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
        category: this.state.categoryFilter,
        cc: this.state.ccFilter,
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

    this.setState({
      week:
      {
        currentWeekNumber: 0,
        queryWeekNumber
      }
    });
    this.searchQuery(req);

  };

  searchQuery(req) {

    fetch(`/api/historySearchQuery.php`, req)
          .then(response => response.json())
          .then(current => {
            console.dir(current);
            this.setState({
              current
              // week: { currentWeekNumber: 0 }
            });
            // this.currentSummary();
            this.querySummary();
          })

        let budget = this.state.totalBudget;

    // fetch(`/api/historySearchQuery.php`, req)
    //   .then(response => response.json())
    //   .then(current => {
    //     console.log("searchQuery current is: ", current)

    //     this.setState({ current });
    //     this.querySummary();
    //   })
  }

  retrieveAllData(currentWeekNumber) {

    let budget = this.props.budget;
    let week = currentWeekNumber;
    let totalBudget = budget * week;

      fetch(`/api/retrieveAllData.php`)
        .then(response => response.json())
        .then(current => {
          this.setState({ current });

          let totalSummary = TotalSummary(week, current, totalBudget);

          this.setState({
            totalTestSpendings: {
              total: totalSummary.spendings.totalSpendings,
              food: totalSummary.spendings.totalFoodSpendings,
              home: totalSummary.spendings.totalHomeSpendings,
              gifts: totalSummary.spendings.totalGiftsSpendings,
              travel: totalSummary.spendings.totalTravelSpendings,
              entertainment: totalSummary.spendings.totalEntertainmentSpendings,
              dogs: totalSummary.spendings.totalDogSpendings
            },

            totalTestCredits: {
              total: totalSummary.credits.totalCredits,
              food: totalSummary.credits.totalFoodCredits,
              home: totalSummary.credits.totalHomeCredits,
              gifts: totalSummary.credits.totalGiftsCredits,
              travel: totalSummary.credits.totalTravelCredits,
              entertainment: totalSummary.credits.totalEntertainmentCredits,
              dogs: totalSummary.credits.totalDogCredits
            },

            totalTestFixed: {
              total: totalSummary.fixed.totalFixed,
              groceries: totalSummary.fixed.totalGroceries,
              gas: totalSummary.fixed.totalGas,
              fixedEtc: totalSummary.fixed.totalFixedEtc,
            },

            others: {
              totalRemaining: totalSummary.others.totalRemaining,
              budget: totalSummary.others.budget
            }

          });
          // console.log("totalSummary is: ", totalSummary);
          // console.log("totalSummary.spendings is: ", totalSummary.spendings);
          // console.log("totalSummary.credits is: ", totalSummary.credits);
          // console.log("totalSummary.fixed is: ", totalSummary.fixed);
          // console.log("totalSummary.others is: ", totalSummary.others);
        })
  }

  setWeek(currentWeekNumber) {
    this.setState({
      week: {
        currentWeekNumber,
        queryWeekNumber: 0
      }
    });
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
    let currentWeekNumber = GetCurrentWeekNum();
    this.setWeek(currentWeekNumber);
    this.retrieveAllData(currentWeekNumber);
  }

  render() {

    const dropdownOptions = [
      [
        { value: "All", name: "All" },
        { value: "Spendings", name: "Spendings" },
        { value: "Credits", name: "Credits" },
        { value: "Fixed", name: "Fixed" },
        { value: "Wedding", name: "Wedding" }
      ],
      [
        { value: "All", name: "All" },
        { value: "AmEx", name: "AmEx" },
        { value: "BB", name: "BB" },
        { value: "Freedom", name: "Freedom" },
        { value: "Sapphire", name: "Sapphire" },
        { value: "Venmo", name: "Venmo" }
      ]

    ]

    const textCenter = {
      textAlignLast: "center"
    };

    const totalSpendings = this.state.totalTestSpendings;
    const totalCredits = this.state.totalTestCredits;
    const totalFixed = this.state.totalTestFixed;
    const others = this.state.others;

    const week = this.state.week;
    const { currentWeekNumber, queryWeekNumber } = week;

    // this is for the accordion
    let spendingsDisplay;
    (this.state.spendingsDisplay)
      ? spendingsDisplay = "sDisplayOn"
      : spendingsDispaly = "sDisplayOff";

    console.log("history totalFixed is: ", totalFixed);

    return (

      <React.Fragment>
        <div className="currentWrapperTop">

          <table id="tabla" className="currentSummaryContainer">
            <tbody>

              <tr className="">
                <th>Category</th>
                <td>
                  <select
                    onChange={this.categoryHandleChange}
                    style={textCenter}
                    className="historyDropdown"
                    placeholder={this.state.categoryFilter} >
                    {dropdownOptions[0].map((e, key) => {
                      return <option key={key} value={e.value}>{e.name}</option>;
                    })}
                  </select>
                </td>
              </tr>

              <tr className=" ">
                <th>Credit Card</th>
                <td>
                  <select
                    onChange={this.ccHandleChange}
                    style={textCenter}
                    className="historyDropdown"
                    placeholder={this.state.ccFilter} >
                    {dropdownOptions[1].map((e, key) => {
                      return <option key={key} value={e.value}>{e.name}</option>;
                    })}
                  </select>
                </td>
              </tr>

              <tr className=" ">
                <th>Start Date</th>
                <td>
                  <div className="">
                    <DatePicker
                      selected={this.state.startDate}
                      name="startDate"
                      onChange={this.startDateHandleChange}
                      className="amount1"
                    />
                  </div>
                </td>
              </tr>

              <tr className=" ">
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

              <tr className=" ">
                <th onClick={() => this.retrieveAllData()}>Reset</th>
                <td onClick={() => this.retrieveSearchData()}>Search</td>
              </tr>

            </tbody>
          </table>

          <table id="tabla" className="currentSummaryContainer">
            <tbody>

              <tr className=" remaining">
                <th>Total Budget</th>
                <td>{CurrencyFormatter.format(others.budget)}</td>
              </tr>

              <tr className=" spendings">
                <th>Total Spendings</th>
                <td>{CurrencyFormatter.format(totalSpendings.total)}</td>
              </tr>

              <tr className=" credits">
                <th>Total Credits</th>
                <td>{CurrencyFormatter.format(totalCredits.total)}</td>
              </tr>

              <tr className=" fixed">
                <th>Total Fixed</th>
                <td>{CurrencyFormatter.format(totalFixed.total)}</td>
              </tr>

              <tr className=" ">
                <th>Total Remaining</th>
                <td>{CurrencyFormatter.format(others.totalRemaining)}</td>
              </tr>


            </tbody>
          </table>

          {/* <table id="tabla" className="currentSummaryContainer">
            <tbody>

              <tr className="toggleDisplaySpendings spendings">
                <th>Total Spendings</th>
                <td>{CurrencyFormatter.format(this.state.totalSpendings)}</td>
              </tr>

              <tr className="toggleDisplayCredits credits">
                <th>Total Credits</th>
                <td>{CurrencyFormatter.format(this.state.totalCredits)}</td>
              </tr>

              <tr className="toggleDisplayFixed fixed">
                <th>Total Fixed</th>
                <td>{CurrencyFormatter.format(this.state.totalFixed)}</td>
              </tr>

            </tbody>
          </table> */}

        </div>

        <div className="currentWrapperTop">

          <Accordion
            header={"Total Spendings"}
            week={week} // passing week for TotalSummary()
            category={totalSpendings}
            budget={this.state.totalBudget} />

          <Accordion
            header={"Total Credits"}
            week={week} // passing week for TotalSummary()
            category={totalCredits}
            budget={this.state.totalBudget} />

          <Accordion
            header={"Total Fixed"}
            week={week} // passing week for TotalSummary()
            category={totalFixed}
            budget={this.state.totalBudget} />


        </div>

        {/* <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.current.length}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange.bind(this)}
        /> */}

        <div className="currentWrapperBottom">
          <div className="currentData1">
            <div className="currentDataHeader">
                Date

              {/* <i
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
              </i> */}

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
