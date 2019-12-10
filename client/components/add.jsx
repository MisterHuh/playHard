import React from "react";
import Calendar from "./calendar";

export default class Add extends React.Component   {
  constructor(props) {
    super(props);
    this.state = {
      date: "12/02/2019",
      category: "Spendings",
      subCategory: "food"
    }
  }

  render() {
    return(
      <div>
        <div className="mx-4">
          <div className="mt-5">
            <Calendar />
          </div>
        </div>

        <div className="mx-4">
          <input className="w-100 mt-5 border"  placeholder="  category" type="text" />
        </div>

        <div className="mx-4">
          <input className="w-100 mt-5 border"  placeholder="  subCategory" type="text" />
        </div>
      </div>
    )
  }
}
