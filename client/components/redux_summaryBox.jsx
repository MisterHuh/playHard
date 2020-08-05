import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllData } from '../actions/fetchAllData';


// function SummaryBox({ posts }) {

//   useEffect(() => {
//     fetchAllData()
//   }, [])

//   return (
//     <div>
//       <h1>Posts</h1>
//       {posts.map(post => (
//         <div key={post.id} >
//           <h3>{post.amount}</h3>
//           <p>{post.where}</p>
//         </div>
//       ))}
//     </div>
//   )
// }


class SummaryBox extends React.Component {
  componentDidMount() {
    console.log("componentDidMoun fired");
    this.props.fetchAllData();
  }

  render() {

    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <p>{post.category}</p>
        <p>{post.amount}</p>
        <hr />
      </div>
    ));

    return (
      <div>

        <h3>Data Retrieved</h3>
        {postItems}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.current.items
})

export default connect(
  mapStateToProps,
  { fetchAllData }
)(SummaryBox)
