import React from "react";

export default class Current extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div className="currentWrapper">
        <div className="currentContainer">Container 1</div>
        <div className="currentContainer">Container 2</div>
        <div className="currentContainer">Container 3</div>
      </div>


      // <div className="currentFixed my-4">
      //   <div className="item item-1">item-1</div>
      //   <div className="item item-2">item-2</div>
      //   <div className="item item-3">item-3</div>
      // </div>

    )
  }
}
