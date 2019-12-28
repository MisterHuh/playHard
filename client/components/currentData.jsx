import React from "react";
import { CurrencyFormatter } from "./currencyFormatter";

export const CurrentData = props => {

  return(

    <div>
      { props.current.map(entry => {
        return(

            <div
              key={entry.id}
              className={"currentDataContainer"}
            >
              <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.date}</div>
              <div className={"currentDataHeader "  + entry.category.toLowerCase()}>{entry.subCategory}</div>
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




// export default class currentData extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: [],
//       subCategory: []
//     };
//   }

//   render() {
//     return(
//       <div className="">
//         <div>currentData</div>
//       </div>
//     )
//   }
// }
