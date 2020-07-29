import React from "react";
import { CurrencyFormatter, TotalSummary, GetCurrentWeekNum } from "./helperFunctions";
import { Navbar } from "./navbar";
import Add from "./add";
import Current from "./current";
import History from "./history"

import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
import store from "../store";

/* this is placeholder store, to explain Provider */
// takes dummy function --> will be a reducer
// takes the initial state
// takes enhancers
// const store = createStore(() => [], {}, applyMiddleware());


export default class ReduxApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      currentWeekNumber: 1,

      view: "history",
      budget: 150,

      current: [],

      spendings: 0,
      credits: 0,
      remaining: 0,

      fixed: 0,
      groceries: 0,
      gas: 0,
      fixedEtc: 0,



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

      week: {
        currentWeekNumber: 0,
        queryWeekNumber: 0
      }

    }

    this.setView = this.setView.bind(this);
    this.retrieveAllData = this.retrieveAllData.bind(this);
    this.currentSummary = this.currentSummary.bind(this);

  }

  setView(view) {
    this.setState({ view })
  };

  /* is there too much happening here? */
  currentSummary() {

    /* these 2 lines of code will probably replace getWeekNum */
    // let currentWeekNumber = this.props.currentWeekNumber;
    // this.setState({ currentWeekNumber })

    let currentWeekNumber = this.state.currentWeekNumber;

    let current = this.state.current;

    let totalSpendings = 0;
    let totalCredits = 0;
    let totalBudget = this.state.budget;
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
      ficedEtc: totalFixedEtc
    })

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
        console.log("APP totalSummary is: ", totalSummary);
        // console.log("totalSummary.spendings is: ", totalSummary.spendings);
        // console.log("totalSummary.credits is: ", totalSummary.credits);
        // console.log("totalSummary.fixed is: ", totalSummary.fixed);
        // console.log("totalSummary.others is: ", totalSummary.others);
      })




    // let endpoint;
    // if (this.state.view === "add") {
    //   endpoint = "getCurrent"
    // } else {
    //   endpoint = "retrieveAllData";
    // }

    // console.log("endpoint is: ", endpoint);

    // fetch(`/api/` + endpoint + `.php`)
    //   .then(response => response.json())
    //   .then(current => {
    //     console.log("retrieveData current is: ", current);
    //     this.setState({ current });
    //     this.currentSummary();
    //   })




  };

  componentDidMount() {

    // console.log("2. CDM app.jsx");

    // const currentWeekNumber = GetCurrentWeekNum();
    // this.setState({ currentWeekNumber });
    // this.retrieveAllData(currentWeekNumber);

  }

  render() {

    let currentView = this.state.view;
    let displayView = null;

    if (currentView === 'add') {
      displayView = <Add setView={this.setView} />;
    } else if (currentView === "current") {
      displayView =
        <Current
          budget={this.state.budget}
          currentWeekNumber={this.state.currentWeekNumber}
          deleteEntry={this.deleteEntry}
          current={this.state.current}
        // currentSummary={this.currentSummary}

        />
    } else if (currentView === "history") {
      displayView =
        <History
          budget={this.state.budget}
          currentWeekNumber={this.state.currentWeekNumber}
          current={this.state.current}
        />
    }

    return (

      <Provider store={store}>
        <div>
          <Navbar setView={this.setView} currentView={currentView} />
          {displayView}
        </div>
      </Provider>
    )
  }
}
