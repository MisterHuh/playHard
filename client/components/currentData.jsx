import React from "react";

export const CurrentData = props => {
  return(

    <div>
      { props.current.map(entry => {
        return(
          <div
            key={entry.id}
            className="currentDataContainer"
          >
            <div className="currentDataBox">{entry.date}</div>
            <div className="currentDataBox">{entry.subCategory}</div>
            <div className="currentDataBox">{entry.cc}</div>
            <div className="currentDataBox">{entry.amount}</div>
            <div className="currentDataBox">{entry.store}</div>
            <div className="currentDataBox">{entry.notes}</div>

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
