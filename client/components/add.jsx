import React from "react";

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
      <div className="border border-dark mt-5">TEST</div>
    )
  }
}
