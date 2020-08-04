import React from 'react';
import { connect } from 'react-redux';
import { fetchAllData } from '../actions/fetchAllData';

// function SummaryBox(props) {
//   return (
//     <div>
//       <div>length is: {props.current.length}</div>
//       <div>Total Budget</div>
//       <div>Total Spendings</div>
//       <div>Total Credits</div>
//       <div>Total Fixed</div>
//       <div>Total Remaining</div>
//     </div>
//   )
// }


class SummaryBox extends React.Component {
  componentDidMount() {
    this.props.fetchAllData();
  }

  render() {

    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

    // const current = this.props.current.length;

    return (
      <div>

        <h3>Posts</h3>

        {postItems}

        {/* <div>Total Budget</div>
        <div>Total Spendings</div>
        <div>Total Credits</div>
        <div>Total Fixed</div>
        <div>Total Remaining</div> */}

      </div>
    )
  }
}


// const mapStateToProps = state => ({
//   posts: state.posts.items
// })

const mapStateToProps = state => ({
    posts: state.posts.items
})

// export default SummaryBox;
export default connect(
  mapStateToProps,
  { fetchAllData }
)(SummaryBox)
