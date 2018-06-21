import React, {Component} from 'react';
import Button from './Button';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {array} from 'prop-types'

import {getPosts} from '../actions/posts';

class Posts extends Component {
    componentDidMount() {
        const {getPosts} = this.props;
        getPosts();
    }

    redirectToPost = (id) => {
        const {history} = this.props;
        history.push(`/posts/${id}`);
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
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {posts} = this.props;

        return (<div className="container">
            <h1>All Posts</h1>
            <div className="row">
                {posts.map(this.renderPost)}
            </div>
        </div>);
    }
}

Posts.propTypes = {
    posts: array.isRequired
};

function mapStoreToProps(store) {
    return {
        posts: store.posts.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPosts
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Posts);