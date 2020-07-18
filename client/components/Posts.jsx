import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";

class Posts extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     posts: []
  //   }
  // }

  // componentWillMount() {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then(res => res.json())
  //     .then(data => {
  //         console.log(data);
  //         this.setState({ posts: data })
  //     })
  // }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

    return (
      <div>

        <h1>Posts</h1>
        {postItems}

      </div>
    )
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  // fetchPost() is actually a property

  posts: PropTypes.array.isRequired
  // because we mapped the itemsin the state to the post property
};

const mapStateToProps = state => ({
  posts: state.posts.items
  // the object has a post key type,
  // which is the same from /reducers/index.js
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
