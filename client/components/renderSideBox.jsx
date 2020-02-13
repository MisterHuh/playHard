import React from "react";
import { CurrencyFormatter } from "./currencyFormatter";

export const RenderSideBox = props => {

  return(

    <div>
      { props.current.map(entry => {

        let creditsFontColor = entry.amount < 0 ? "creditsFontColor" : null;

        return(

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
}
