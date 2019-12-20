import React from "react";
import CurrentData from "./currentData";

export default class Current extends React.Component {
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

      <div className="mt-4">
        <CurrentData />
      </div>

      </React.Fragment>



      // <div className="currentFixed my-4">
      //   <div className="item item-1">item-1</div>
      //   <div className="item item-2">item-2</div>
      //   <div className="item item-3">item-3</div>
      // </div>

    )
  }
}
