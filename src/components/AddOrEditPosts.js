import React, {Component} from 'react';
import Button from './Button';
import Input from './Input';
import {array, func} from 'prop-types'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addPost, deletePost} from '../actions/posts'

class AddOrEditPosts extends Component {
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

        return currentPost || {
            _id: null,
            title: '',
            body: '',
            image: ''
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState(this.mapPropsToState(nextProps))
    }

    deletePost = () => {
        const {_id} = this.state;
        const {deletePost} = this.props;

        deletePost({_id});
    };
    save = () => {
        const {title, body, image, _id} = this.state;
        const {addPost} = this.props;

        addPost({title, body, image, _id});
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {title, body, image, _id} = this.state;

        return (<div className="container">
                <h1>{_id ? 'Edit' : 'Add'} Post</h1>
                <Input
                    title="Title"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'title')
                    }}
                    value={title}
                />
                <Input
                    title="Image"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'image')
                    }}
                    value={image}
                />
                <
                    textarea
                    value={body}
                    onChange={(e) => {
                        this.onInputChange(e.currentTarget.value, 'body')
                    }}
                />
                <Button
                    title="Submit"
                    className="btn waves-effect waves-light"
                    onClick={this.save}
                />
                <Button
                    title="Delete post"
                    className="btn waves-effect waves-light"
                    onClick={this.deletePost}
                />
            </div>
        );
    }
}

AddOrEditPosts.propTypes = {
    posts: array.isRequired,
    addPost: func.isRequired,
    deletePost: func.isRequired
};

function mapStoreToProps(store) {
    return {
        posts: store.posts.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addPost,
        deletePost
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(AddOrEditPosts);