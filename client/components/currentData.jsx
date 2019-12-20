import React from "react";

export const CurrentData = props => {
  return(

    <div>
      { props.current.map(entry => {
        return(
          <div key={entry.id}>
            {entry.store}
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
