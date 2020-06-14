import React from "react";
import { Accordion } from "./accordion";
import { CurrencyFormatter, TotalSummary, GetCurrentWeekNum, GetQueryWeekNum, RenderData, FormatDate, FormatDate1 } from "./helperFunctions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Current extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      current: [],

      week: {
        currentWeekNumber: 0,
        queryWeekNumber: 0
      },

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

      todayDate: "",
      startDate: "",
      endDate: "",
      prevWeekStartdate: "",
      endpointToggle: true,

      editModal: false

    }

    this.retrieveCurrentData = this.retrieveCurrentData.bind(this);
    this.setWeek = this.setWeek.bind(this);

    this.deleteEntry = this.deleteEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);

    this.findStartEndDates = this.findStartEndDates.bind(this);
    this.formatDateString = this.formatDateString.bind(this);

    this.retrieveNextWeek = this.retrieveNextWeek.bind(this);
    this.retrievePrevWeek = this.retrievePrevWeek.bind(this);
    this.weekToggleQuery = this.weekToggleQuery.bind(this);
  };

  retrieveCurrentData(currentWeekNumber) {

    // let endPoint = "getCurrent";
    let curTimestamp = new Date();

    let justin = curTimestamp.setDate(curTimestamp.getDate() + 6);
    // alert(justin);
    let unixTimestamp = curTimestamp.getTime();
    let todayDate = this.formatDateString(unixTimestamp);
    // alert(todayDate);
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

        // this.findStartEndDates();
      })

  }

  retrievePrevWeek() {

    //                 0          1          2         3             4          5         6
    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDay, startDate;

    (!this.state.prevWeekStartdate)
      ? currentDay = new Date()     // Sat Jun 06 2020 19:57:03 GMT-0700 (Pacific Daylight Time)
      : currentDay = new Date(this.state.prevWeekStartdate);

    let dayIndex = currentDay.getDay(); // grabs the week index. refer to $daysList
    // alert(dayIndex);

    if (!dayIndex) {
      startDate = currentDay.setDate(currentDay.getDate() - 7);
    } else if (dayIndex === 1) {
      startDate = currentDay.setDate(currentDay.getDate() - 8);
    } else if (dayIndex === 2) {
      startDate = currentDay.setDate(currentDay.getDate() - 9);
    } else if (dayIndex === 3) {
      startDate = currentDay.setDate(currentDay.getDate() - 10);
    } else if (dayIndex === 4) {
      startDate = currentDay.setDate(currentDay.getDate() - 11);
    } else if (dayIndex === 5) {
      startDate = currentDay.setDate(currentDay.getDate() - 12);
    } else if (dayIndex === 6) {
      startDate = currentDay.setDate(currentDay.getDate() - 13);
    };

    let endDate = currentDay.setDate(currentDay.getDate() + 6);

    startDate = FormatDate(new Date(startDate))
    endDate = FormatDate(new Date(endDate))

    // alert(startDate);
    // alert(endDate);

    const req = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate,
        endDate
      })
    };

    let queryWeekNumber = GetQueryWeekNum(startDate);

    let curTimestamp = new Date();
    let unixTimestamp = curTimestamp.getTime();
    let todayDate = this.formatDateString(unixTimestamp);

    this.setState({
      todayDate,
      startDate,
      endDate,
      prevWeekStartdate: startDate,

      week: {
        currentWeekNumber: 0,
        queryWeekNumber
      }
    });

    this.weekToggleQuery(req, queryWeekNumber);
  }

  retrieveNextWeek() {

    //                 0          1          2         3             4          5         6
    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDay, startDate;

    (!this.state.prevWeekStartdate)
      ? currentDay = new Date()     // Sat Jun 06 2020 19:57:03 GMT-0700 (Pacific Daylight Time)
      : currentDay = new Date(this.state.prevWeekStartdate);

    let dayIndex = currentDay.getDay(); // grabs the week index. refer to $daysList
    // alert(dayIndex);

    if (!dayIndex) {
      startDate = currentDay.setDate(currentDay.getDate() + 7);
    } else if (dayIndex === 1) {
      startDate = currentDay.setDate(currentDay.getDate() + 8);
    } else if (dayIndex === 2) {
      startDate = currentDay.setDate(currentDay.getDate() + 9);
    } else if (dayIndex === 3) {
      startDate = currentDay.setDate(currentDay.getDate() + 10);
    } else if (dayIndex === 4) {
      startDate = currentDay.setDate(currentDay.getDate() + 11);
    } else if (dayIndex === 5) {
      startDate = currentDay.setDate(currentDay.getDate() + 12);
    } else if (dayIndex === 6) {
      startDate = currentDay.setDate(currentDay.getDate() + 13);
    };

    let endDate = currentDay.setDate(currentDay.getDate() + 6);

    console.log(new Date(startDate));
    console.log(new Date(endDate));

    startDate = FormatDate(new Date(startDate))
    endDate = FormatDate(new Date(endDate))

    // alert(startDate);
    // alert(endDate);

    const req = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate,
        endDate
      })
    };

    let queryWeekNumber = GetQueryWeekNum(startDate);

    let curTimestamp = new Date();
    let unixTimestamp = curTimestamp.getTime();
    let todayDate = this.formatDateString(unixTimestamp);

    this.setState({
      todayDate,
      startDate,
      endDate,
      prevWeekStartdate: startDate,

      week: {
        currentWeekNumber: 0,
        queryWeekNumber
      }
    });

    this.weekToggleQuery(req, queryWeekNumber);
  }

  weekToggleQuery(req, queryWeekNumber) {

    let totalBudget = this.props.budget;

    fetch(`/api/weekToggleQuery.php`, req)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });

        let totalSummary = TotalSummary(queryWeekNumber, current, totalBudget);

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

      })
  };

  findStartEndDates() {

    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // let rawStartDate, rawEndDate;
    // let start = new Date();
    // let end = new Date();

    // let startIndex = 0; // to find the start date
    // let endIndex = 0; // to find the end date

    // let day = daysList[start.getDay()]; // finds the current day from daysList

    // /* determines how many days to add / subtract */
    // if (day === "Sunday") {
    //   startIndex = 0;
    //   endIndex = 6;
    // } else if (day === "Monday") {
    //   startIndex = -1;
    //   endIndex = 5;
    // } else if (day === "Tuesday") {
    //   startIndex = -2;
    //   endIndex = 4;
    // } else if (day === "Wednesday") {
    //   startIndex = -3;
    //   endIndex = 3;
    // } else if (day === "Thursday") {
    //   startIndex = -4;
    //   endIndex = 2;
    // } else if (day === "Friday") {
    //   startIndex = -5;
    //   endIndex = 1;
    // } else if (day === "Saturday") {
    //   startIndex = -6;
    //   endIndex = 0;
    // }

    // rawStartDate = start.setTime(start.getTime() + (startIndex * 24 * 60 * 60 * 1000));
    // rawEndDate = end.setTime(end.getTime() + (endIndex * 24 * 60 * 60 * 1000));

    // let startDate = this.formatDateString(rawStartDate);
    // let endDate = this.formatDateString(rawEndDate);

    // console.log(rawStartDate);
    // console.log(rawEndDate);
    // console.log(startDate);
    // console.log(endDate);



    //                 0          1          2         3             4          5         6
    // let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // let currentDay = new Date();
    // let dayIndex = currentDay.getDay(); // grabs the week index. refer to $daysList
    // alert(dayIndex);

    let curTimestamp = new Date();
    let startDate = FormatDate1(curTimestamp);
    let endDate = FormatDate1(curTimestamp);
    // let unixTimestamp = curTimestamp.getTime();
    // let todayDate = this.formatDateString(unixTimestamp);

    alert(startDate);
    alert(endDate);
    // let startDate;


    // if (!dayIndex) {
    //   startDate = currentDay.setDate(currentDay.getDate());
    // } else if (dayIndex === 1) {
    //   startDate = currentDay.setDate(currentDay.getDate() - 1);
    // } else if (dayIndex === 2) {
    //   startDate = currentDay.setDate(currentDay.getDate() + 9);
    // } else if (dayIndex === 3) {
    //   startDate = currentDay.setDate(currentDay.getDate() + 10);
    // } else if (dayIndex === 4) {
    //   startDate = currentDay.setDate(currentDay.getDate() + 11);
    // } else if (dayIndex === 5) {
    //   startDate = currentDay.setDate(currentDay.getDate() + 12);
    // } else if (dayIndex === 6) {
    //   startDate = currentDay.setDate(currentDay.getDate() + 13);
    // };

    // console.log("startDate is: ", startDate);
    // console.log("new Date(startDate) is: ", new Date(startDate));
    // console.log(new Date(endDate));

    // let ah =

    // let testOne = FormatDate1(new Date(startDate));

    // let test = FormatDate(new Date(startDate));
    // console.log("test is: ", test);
    // endDate = FormatDate(new Date(endDate))

    this.setState({ startDate, endDate })

  }

  formatDateString(date) {

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

  editEntry(id) {
    alert(this.state.editModal);
    console.log("id for seleted is: ", id);
    let editModal = this.state.editModal;
    this.setState({
      editModal: !editModal
    });
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

    // currentWeek's budget always set to budget
    let defaultWeekNumber = 1;

    // for rendering this.state.currentWeekNumber for table
    let currentWeekNumber = GetCurrentWeekNum();
    this.setWeek(currentWeekNumber);
    this.retrieveCurrentData(defaultWeekNumber);
    // console.log("current week num is: ", currentWeekNumber);
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

    // const textCenter = {
    //   textAlignLast: "center"
    // };

    const totalSpendings = this.state.totalTestSpendings;
    const totalCredits = this.state.totalTestCredits;
    const totalFixed = this.state.totalTestFixed;
    const others = this.state.others;

    const week = this.state.week;

    let test;
    (this.state.editModal)
      ? test = "test"
      : test = "";

      return (

        <React.Fragment>

        <div className="currentWrapperTop">

            <table id="tabla" className="currentSummaryContainer">
              <tbody>

                <tr className="">
                  <th>Current Week</th>
                  <td>{(this.state.week.currentWeekNumber)
                          ? this.state.week.currentWeekNumber
                          : this.state.week.queryWeekNumber}
                  </td>
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

                <tr className="meter">
                  <td colSpan="4">Reset</td>
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
            <div className="currentDataHeader">
                <i
                    onClick={() => this.retrieveNextWeek()}
                    className="arrow fas fa-caret-left">

                    </i>
                  Date
                  <i
                    onClick={() => this.retrievePrevWeek()}
                    className="arrow fas fa-caret-right">
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
                    editEntry={this.editEntry}/>
                  )
              })}
          </React.Fragment>

        </div>

      </React.Fragment>

      )
  }
}
