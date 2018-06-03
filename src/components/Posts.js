import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getPosts, deletePost } from '../actions/app'

class Posts extends Component {

  componentDidMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  deletePost = (id) => {
    const { deletePost } = this.props;
    deletePost(id);
  };

  renderLi = (el, ind) => {
    return (
      <li key={ind}>
          {el.title}
          <br />
          {el.body}
          <br />
          {el.description}
          <br />
          {el.userId}
          <br />
        <button onClick={() => {
          this.deletePost(el._id);
        }}>Delete post
        </button>
      </li>
    );
  };

  render() {
    const { posts } = this.props;

    return (<div>
      <ul className="list">
          {posts.map(this.renderLi)}
      </ul>
        </div>
    );
  }
}

function mapStoreToProps(store) {
  return {
      posts: store.posts.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPosts,
    deletePost,
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Posts);
