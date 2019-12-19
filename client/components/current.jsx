import React from "react";

export default class Current extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="currentFixed my-4">
        <div className="item item-1">item-1</div>
        <div className="item item-2">item-2</div>
        <div className="item item-3">item-3</div>
      </div>
    )
  }
}
