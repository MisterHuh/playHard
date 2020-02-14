import React from "react";
import { CurrencyFormatter } from "./currencyFormatter";

export const RenderSideBox = props => {
  console.log("props.currentIndex is: ", props.currentIndex);
  console.log("props.current is: ", props.current);

  if (props.currentIndex) {
    return (

      <div>
        {props.current.map(entry => {

          let creditsFontColor = entry.amount < 0 ? "creditsFontColor" : null;
          console.log("entry is: ", entry);

          return (

            <div key={entry.id} className={"currentData"}>
              <div className="prevRec mt-3">{entry[props.currentIndex]["date"]}</div>
              <div className="prevRec mt-3">{entry[props.currentIndex]["category"]}</div>
              <div className="prevRec mt-3">{entry[props.currentIndex]["subcategory"]}</div>
              <div className="prevRec mt-3">{entry[props.currentIndex]["cc"]}</div>
              <div className="prevRec mt-3">{CurrencyFormatter.format(entry[props.currentIndex]["amount"])}</div>
              <div className="prevRec mt-3">{entry[props.currentIndex]["store"]}</div>
              <div className="prevRec mt-3">{entry[props.currentIndex]["notes"]}</div>
            </div>
          )
        })

        }
      </div>
    )
  } else {
    return (
      <div>TEST</div>
    )
  }




}
