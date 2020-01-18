import React from "react";
import { CurrencyFormatter } from "./currencyFormatter";

export const RenderData = props => {

  return(

    <div>
      { props.current.map(entry => {

        let creditsFontColor = entry.amount < 0 ? "creditsFontColor" : null;

        return(

          <div
            key={entry.id}
            className={"currentData"}
          >
            <div className={"iconBox currentDataHeader "  + entry.category.toLowerCase()}>
              <i class="fas fa-times"></i>
              <i className="fas fa-edit"></i>
              <div className="test">{entry.date}</div>
            </div>
            <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.subcategory}</div>
            <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.cc}</div>
            <div className={"currentDataHeader "  + creditsFontColor + " " + entry.category.toLowerCase()}>{CurrencyFormatter.format(entry.amount)}</div>
            <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.store}</div>
            <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.notes}</div>

          </div>
        )
      })

      }
    </div>
  )
}
