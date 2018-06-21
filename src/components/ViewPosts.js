import React, {Component} from 'react';
import {array, func} from 'prop-types'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addPost, deletePost} from '../actions/posts'

class ViewPosts extends Component {
    constructor(props) {
        super(props);
        this.state = this.mapPropsToState(props);
    }

    mapPropsToState = (props) => {
        const {posts, match: {params}} = props;
        const {id} = params;
        const currentPost = posts.find((el) => {
            return el._id === id;
        });
        return currentPost;
    };

    componentWillReceiveProps(nextProps) {
        this.setState(this.mapPropsToState(nextProps))
    }

    render() {
        const {title, body, image} = this.state;

        return <div className="container">
            <h1>{title}</h1>
            <article>
                <img className ="responsive-img" src={image}/>
                <section>{body}</section>
            </article>
        </div>;
    }
}

ViewPosts.propTypes = {
    posts: array.isRequired
};

function mapStoreToProps(store) {
    return {
        posts: store.posts.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(ViewPosts);