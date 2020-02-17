import React from "react";
import { CurrencyFormatter } from "./currencyFormatter";

export const RenderData = props => {
  let entry = props.entry;
  let id = entry["id"];
  let creditsFontColor = entry["amount"] < 0 ? "creditsFontColor" : null;

  if (entry) {
    return (
      <div className={"currentData"} >
        <div className={"currentDataHeader renderDataHover " + entry["category"].toLowerCase()}>

          <div className="iconContainer ">
            <i onClick={() => props.deleteEntry(id)} className="icon fas fa-times"></i>
          </div>

          <div className="iconContainer ">
            <i className="icon fas fa-edit"></i>
          </div>

          <div>
            <div className="">{entry["date"]}</div>
          </div>

        </div>
        <div
          onClick={props.deleteEntry}
          className={"currentDataHeader " + entry["category"].toLowerCase()}>{entry["subcategory"]}</div>

        <div className={"currentDataHeader " + entry["category"].toLowerCase()}>{entry["cc"]}</div>
        <div className={"currentDataHeader " + entry["category"].toLowerCase() + " " + creditsFontColor}>{CurrencyFormatter.format(entry["amount"])}</div>
        <div className={"currentDataHeader " + entry["category"].toLowerCase()}>{entry["store"]}</div>
        <div className={"currentDataHeader " + entry["category"].toLowerCase()}>{entry["notes"]}</div>

      </div>
    )
  }

}
