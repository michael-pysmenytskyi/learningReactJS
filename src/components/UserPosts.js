import React, { Component } from 'react';
import Button from './Button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { array } from 'prop-types'

import { getUserPosts } from '../actions/posts';

class UserPosts extends Component {
  componentDidMount() {
    const { getUserPosts } = this.props;
    getUserPosts();
  }

  redirectToPost = (id) => {
    const { history } = this.props;
    history.push(`/posts/${id}`);
  };

    redirectToEditPost = (id) => {
        const { history } = this.props;
        history.push(`/editPost/${id}`);
    };

    renderPost = (el) => {
        return (
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src={el.image}></img>
                        <span className="card-title">{el.title}</span>
                    </div>
                    <div className="card-action">
                        <Button
                            title= "Open"
                            className="btn waves-effect waves-light"
                            onClick={() => {
                                return this.redirectToPost(el._id)
                            }}
                        />
                        <Button
                            title= "Edit"
                            className="btn waves-effect waves-light"
                            onClick={() => {
                                return this.redirectToEditPost(el._id)
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    };

  render() {
    const { posts } = this.props;
    return (<div className="container">
      <h1>My Posts</h1>
      <div className="row">
        {posts.map(this.renderPost)}
      </div>
    </div>);
  }
}

UserPosts.propTypes = {
  posts: array.isRequired
};

function mapStoreToProps(store) {
  return {
    posts: store.posts.items
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserPosts
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(UserPosts);