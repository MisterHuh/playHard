import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllData } from '../actions/fetchAllData';

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
