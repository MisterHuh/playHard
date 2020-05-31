import React from "react";
import { Accordion } from "./accordion";
import { RenderData } from "./renderData";
import { CurrencyFormatter, TotalSummary, GetCurrentWeekNum } from "./helperFunctions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Current extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      current: [],

      spendings: 0,
      credits: 0,
      budget: 0,
      remaining: 0,

      fixed: 0,
      groceries: 0,
      gas: 0,
      fixedEtc: 0,

      todayDate: "",
      startDate: "",
      endDate: "",

      currentWeekNumber: 1,

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

      currentWeekNumber: 1,

      week: {
        currentWeekNumber: 0,
        queryWeekNumber: 0
      }
    }

    this.setWeek = this.setWeek.bind(this);

    this.deleteEntry = this.deleteEntry.bind(this);
    this.currentSummary = this.currentSummary.bind(this);
    this.retrieveCurrentData = this.retrieveCurrentData.bind(this);
    this.findStartEndDates = this.findStartEndDates.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.retrieveNextWeek = this.retrieveNextWeek.bind(this);
  };

  retrieveCurrentData(currentWeekNumber) {

    // let endPoint = "getCurrent";
    let curTimestamp = new Date();
    let unixTimestamp = curTimestamp.getTime();
    let todayDate = this.formatDate(unixTimestamp);
    this.setState({ todayDate });

    // let week = currentWeekNumber;
    let budget = this.props.budget;
    let week = currentWeekNumber;
    let totalBudget = budget * week;

    fetch(`/api/getCurrent.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });

        // this.currentSummary();

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

        this.findStartEndDates();
      })

  }

  retrieveNextWeek() {
    console.log("retrieveNextWeek fired");
    fetch(`/api/getNextWeek.php`)
      .then(response => response.json())
      .then(current => {
        console.log("TEST current is: ", current);
        this.setState({ current });
        this.currentSummary();
      })
  }

  findStartEndDates() {

    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let rawStartDate, rawEndDate;
    let start = new Date();
    let end = new Date();

    let startIndex = 0; // to find the start date
    let endIndex = 0; // to find the end date

    let day = daysList[start.getDay()]; // finds the current day from daysList

    /* determines how many days to add / subtract */
    if (day === "Sunday") {
      startIndex = 0;
      endIndex = 6;
    } else if (day === "Monday") {
      startIndex = -1;
      endIndex = 5;
    } else if (day === "Tuesday") {
      startIndex = -2;
      endIndex = 4;
    } else if (day === "Wednesday") {
      startIndex = -3;
      endIndex = 3;
    } else if (day === "Thursday") {
      startIndex = -4;
      endIndex = 2;
    } else if (day === "Friday") {
      startIndex = -5;
      endIndex = 1;
    } else if (day === "Saturday") {
      startIndex = -6;
      endIndex = 0;
    }

    rawStartDate = start.setTime(start.getTime() + (startIndex * 24 * 60 * 60 * 1000));
    rawEndDate = end.setTime(end.getTime() + (endIndex * 24 * 60 * 60 * 1000));

    let startDate = this.formatDate(rawStartDate);
    let endDate = this.formatDate(rawEndDate);

    this.setState({ startDate, endDate })

  }

  formatDate(date) {

    /* grabbing the unix time stamp differenciates the start / today / end date */
    let timestamp = new Date(date);

    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = "";
    let formattedDate = "";

    /* this adds a 0 to the single-digit months */
    if (timestamp.getMonth() <= 10) {
      month = "0" + (timestamp.getMonth() + 1);
    };

    /* returning value simply set to a variable -> then setState with the variable */
    return formattedDate = daysList[timestamp.getDay()].substring(0, 3) + ", " + month + "/" + timestamp.getDate();

  }

/* is there too much happening here? */
  currentSummary() {

    /* these 2 lines of code will probably replace getWeekNum */
    let currentWeekNumber = this.props.currentWeekNumber;
    this.setState({ currentWeekNumber })

    let current = this.state.current;

    let totalSpendings = 0;
    let totalCredits = 0;
    let totalBudget = this.props.budget;
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
      spendings: totalSpendings,
      credits: totalCredits,
      budget: totalBudget,
      remaining: totalRemaining,
      fixed: totalFixed,
      groceries: totalGroceries,
      gas: totalGas,
      fixedEtc: totalFixedEtc
    })

  }

  deleteEntry(id) {
    console.log("current deleteEntry fired");
    let entryId = id;

    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId })
    };
    fetch(`/api/deleteEntry.php`, req)
      .then(response => response.json())
      .catch(error => {

      });
    this.retrieveCurrentData();
  }

  setWeek(currentWeekNumber) {
    this.setState({
      week: {
        currentWeekNumber,
        queryWeekNumber: 0
      }
    });
  }

  componentDidMount() {

    console.log("1. CDM current.jsx");

    // console.log("here");
    // let currentWeekNumber = this.state.currentWeekNumber;
    let defaultWeekNumber = 1;
    let currentWeekNumber = GetCurrentWeekNum();
    // console.log("there");
    this.setWeek(currentWeekNumber);
    // this.retrieveAllData(currentWkNumber);

    this.retrieveCurrentData(defaultWeekNumber);
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

      return (

        <React.Fragment>

        <div className="currentWrapperTop">

            {/* <div className="currentSummaryContainer">
               <div className="currentSummary">
                 <div className="">Current Week</div>
                 <div className="">Start Date</div>
                 <div className="">End Date</div>
                 <div className="">Today's Date</div>
               </div>
               <div className="currentSummary">
                 <div className="">{this.state.week.currentWeekNumber}</div>
                 <div className="">{this.state.startDate ? this.state.startDate : '\xa0'}</div>
                 <div className="">{this.state.endDate ? this.state.endDate : '\xa0'}</div>
                 <div className="">{this.state.todayDate ? this.state.todayDate : '\xa0'}</div>
               </div>
             </div> */}

            <table id="tabla" className="currentSummaryContainer">
              <tbody>

                <tr className="">
                  <th>Current Week</th>
                  <td>{this.state.week.currentWeekNumber}</td>
                </tr>

                <tr className="">
                  <th>Start Date</th>
                  <td>{this.state.startDate ? this.state.startDate : '\xa0'}</td>
                </tr>

                <tr className="">
                  <th>End Date</th>
                  <td>{this.state.endDate ? this.state.endDate : '\xa0'}</td>
                </tr>

                <tr className="">
                  <th>Today's Date</th>
                  <td>{this.state.todayDate ? this.state.todayDate : '\xa0'}</td>
                </tr>

                <tr className="">
                  <td>something</td>
                  <td>something</td>
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

          <div className="currentWrapperBottom">
            <div className="currentData1">
              <div className="currentDataHeader">Date</div>
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




        // <React.Fragment>
        //   <div className="currentWrapperTop">

        //     <div className="currentSummaryContainer">
        //       <div className="currentSummary">
        //         <div className="">Current Week</div>
        //         <div className="">Start Date</div>
        //         <div className="">End Date</div>
        //         <div className="">Today's Date</div>
        //       </div>
        //       <div className="currentSummary">
        //         <div className="">{this.state.currentWeekNumber}</div>
        //         <div className="">{this.state.startDate ? this.state.startDate : '\xa0'}</div>
        //         <div className="">{this.state.endDate ? this.state.endDate : '\xa0'}</div>
        //         <div className="">{this.state.todayDate ? this.state.todayDate : '\xa0'}</div>
        //       </div>
        //     </div>

        //     <div className="currentSummaryContainer">
        //       <div className="currentSummary">
        //         <div className="budget remaining">Budget</div>
        //         <div className="spendings">Spendings</div>
        //         <div className="credits">Credits</div>
        //         <div className="">Remaining</div>
        //       </div>
        //       <div className="currentSummary">
        //         <div className="remaining budget">{CurrencyFormatter.format(this.state.budget)}</div>
        //         <div className="spendings">{CurrencyFormatter.format(this.state.spendings)}</div>
        //         <div className="credits">{CurrencyFormatter.format(this.state.credits)}</div>
        //         <div className="">{CurrencyFormatter.format(this.state.remaining)}</div>
        //       </div>
        //     </div>

        //     <div className="currentSummaryContainer">
        //       <div className="currentSummaryHistory">
        //         <div className="fixed">Groceries</div>
        //         <div className="fixed">Gas</div>
        //         <div className="fixed tooltipParent">
        //           Etc
        //           <span className="tooltipText">Utilities & Entertainment</span>
        //         </div>
        //         <div className="">Total Fixed</div>
        //       </div>
        //       <div className="currentSummaryHistory">
        //         <div className="fixed">{CurrencyFormatter.format(this.state.groceries)}</div>
        //         <div className="fixed">{CurrencyFormatter.format(this.state.gas)}</div>
        //         <div className="fixed">{CurrencyFormatter.format(this.state.fixedEtc)}</div>
        //         <div className="">{CurrencyFormatter.format(this.state.fixed)}</div>
        //       </div>
        //     </div>

        //   </div>

        //   {/* <div className="currentWrapperBottom">
        //     <Accordion
        //       header={"Spendings"}
        //       content={"some body content message goes here"} />
        //   </div> */}

        //   <div className="currentWrapperBottom">
        //     <div className="currentDataContainer">
        //       <div className="currentData1">
        //         <div className="currentDataHeader">
        //           <i
        //             onClick={() => this.retrieveCurrentData()}
        //             className="arrow fas fa-caret-left">

        //             </i>
        //           Date
        //           <i
        //             onClick={() => this.retrieveNextWeek()}
        //             className="arrow fas fa-caret-right">
        //           </i>
        //         </div>
        //         <div className="currentDataHeader">subCategory</div>
        //         <div className="currentDataHeader">cc</div>
        //         <div className="currentDataHeader">Amount</div>
        //         <div className="currentDataHeader">Store</div>
        //         <div className="currentDataHeader">Notes</div>
        //       </div>

        //       <React.Fragment>
        //         {this.state.current.map(entry => {
        //           return (
        //             <RenderData
        //               current={this.state.current}
        //               entry={entry}
        //               key={entry["id"]}
        //               deleteEntry={this.deleteEntry}
        //             />
        //           )
        //         })
        //         }
        //       </React.Fragment>

        //     </div>
        //   </div>
        // </React.Fragment>

      )
    // }
  }
}
