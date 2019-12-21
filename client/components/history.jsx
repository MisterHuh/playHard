import React from "react";

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <React.Fragment>

      <div className="currentWrapper mt-4">

        <div className="currentContainer">
          <div className="currentBox"></div>
          <div className="currentBox">Total Spent</div>
          <div className="currentBox">Credit</div>
          <div className="currentBox">Remaining</div>
        </div>

        <div className="currentContainer">
          <div className="currentBox">Spendings</div>
          <div className="currentBox">$12.00</div>
          <div className="currentBox">$12.00</div>
          <div className="currentBox">$12.00</div>
        </div>

        <div className="currentContainer">
          <div className="currentBox">Fixed</div>
          <div className="currentBox">$12.00</div>
          <div className="currentBox">$12.00</div>
          <div className="currentBox">$12.00</div>
        </div>

      </div>

      <div className="mt-4 currentTableHeaderContainer">
        <div className="currentTableHeader">
          <div className="currentTableRow">Date</div>
          <div className="currentTableRow">subCategory</div>
          <div className="currentTableRow">cc</div>
          <div className="currentTableRow">Amount</div>
          <div className="currentTableRow">Store</div>
          <div className="currentTableRow">Notes</div>
        </div>
        {/* <CurrentData current={this.state.current} /> */}
      </div>

      </React.Fragment>

    )
  }
}
