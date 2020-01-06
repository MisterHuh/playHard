import React from "react";
import { CurrencyFormatter } from "./currencyFormatter";

export const RenderData = props => {

  return(

    <div>
      { props.current.map(entry => {
        return(

            <div
              key={entry.id}
              className={"currentData"}
            >
              <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.date}</div>
              <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.subcategory}</div>
              <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.cc}</div>
              <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{CurrencyFormatter.format(entry.amount)}</div>
              <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.store}</div>
              <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.notes}</div>

            </div>
        )
      })

      }
    </div>
  )
}
