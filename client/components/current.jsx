import React from "react";
import { RenderData } from "./renderData";
import { CurrencyFormatter } from "./currencyFormatter";

export default class Current extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [],
      spendings: 0,
      credits: 0,
      fixed: 0,
      budget: 0,
      remaining: 0
    }
    this.currentSummary = this.currentSummary.bind(this);
    this.retrieveCurrentData = this.retrieveCurrentData.bind(this);
  };

  retrieveCurrentData() {
    fetch(`/api/getCurrent.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });
        this.currentSummary();
      })
  }

  currentSummary() {

    let current = this.state.current;
    let length = current.length - 1;
    let spendings = 0;
    let credits = 0;
    let fixed = 0;
    let budget = this.props.budget;
    let remaining = 0;

    for (let index = 0; index <= length; index++) {
      if (current[index]["category"] == "Spendings") {
        spendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Fixed") {
        fixed += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Credits") {
        credits += parseFloat(current[index]["amount"]);
      }
    }

    spendings = spendings.toFixed(2);
    credits = credits.toFixed(2);
    fixed = fixed.toFixed(2);
    remaining = budget - credits - spendings;

    this.setState({
      spendings,
      credits,
      fixed,
      budget,
      remaining
    })

    console.log("CURRENT VIEW this.state.budget is: ", this.state.budget);
    console.log("CURRENT VIEW this.state.current is: ", this.state.current)

  }

  componentDidMount() {
    this.retrieveCurrentData();
  }

  render() {

    if (!this.state.budget) {
      console.log("CURRENT VIEW componentDidMount needs to run");
      return null;
    } else {

      console.log("CURRENT VIEW componentDidMount RAN");

      return (

        <div className="currentWrapper">

          <div className="currentSummaryContainer">
            <div className="currentSummary">
              <div className="spendings">Spendings</div>
              <div className="credits">Credits</div>
              <div className="fixed">Fixed</div>
              <div className="remaining">Remaining</div>
            </div>
            <div className="currentSummary">
              <div className="spendings">{CurrencyFormatter.format(this.state.spendings)}</div>
              <div className="credits">{CurrencyFormatter.format(this.state.credits)}</div>
              <div className="fixed">{CurrencyFormatter.format(this.state.fixed)}</div>
              <div className="remaining">{CurrencyFormatter.format(this.state.remaining)}</div>
            </div>
          </div>

          <div className="currentDataContainer">
            <div className="currentData">
              <div className="currentDataHeader">Date</div>
              <div className="currentDataHeader">subCategory</div>
              <div className="currentDataHeader">cc</div>
              <div className="currentDataHeader">Amount</div>
              <div className="currentDataHeader">Store</div>
              <div className="currentDataHeader">Notes</div>
            </div>
            <RenderData current={this.state.current} />
          </div>

        </div>
      )
    }

    // let budget = this.props.budget;
    // let spendings = this.state.spendings;
    // let credits = this.state.credits;
    // let fixed = this.state.fixed;
    // let remaining = budget - credits - spendings;

    // return (

      // <div className="currentWrapper">

      //   <div className="currentSummaryContainer">
      //     <div className="currentSummary">
      //       <div className="spendings">Spendings</div>
      //       <div className="credits">Credits</div>
      //       <div className="fixed">Fixed</div>
      //       <div className="remaining">Remaining</div>
      //     </div>
      //     <div className="currentSummary">
      //       <div className="spendings">{CurrencyFormatter.format(spendings)}</div>
      //       <div className="credits">{CurrencyFormatter.format(credits)}</div>
      //       <div className="fixed">{CurrencyFormatter.format(fixed)}</div>
      //       <div className="remaining">{CurrencyFormatter.format(remaining)}</div>
      //     </div>
      //   </div>

      //   <div className="currentDataContainer">
      //     <div className="currentData">
      //       <div className="currentDataHeader">Date</div>
      //       <div className="currentDataHeader">subCategory</div>
      //       <div className="currentDataHeader">cc</div>
      //       <div className="currentDataHeader">Amount</div>
      //       <div className="currentDataHeader">Store</div>
      //       <div className="currentDataHeader">Notes</div>
      //     </div>
      //       <RenderData current={this.state.current} />
      //   </div>

      // </div>

    // )
  }
}
