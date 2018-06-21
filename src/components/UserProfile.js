import React, { Component } from 'react';
import { connect } from 'react-redux'
import { checkSession } from '../actions/app'
import { bindActionCreators } from "redux";


class UserProfile extends Component {
    componentDidMount() {
        const { checkSession, history } = this.props;
        checkSession(history);
    }

    renderProfile = () => {
        const { currentUser } = this.props;
        return (
            <div>
                <li>{currentUser.name}</li>
                <li>{currentUser.email}</li>
            </div>
        );
    };

    render() {
        return (<div className="container">
            <h1>My Profile</h1>
            <ul>
                {(this.renderProfile())}
            </ul>
        </div>);
    }
}
function mapStoreToProps(store) {
    return {
        currentUser: store.users.currentUser
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkSession
    }, dispatch)
}
export default connect(mapStoreToProps, mapDispatchToProps)(UserProfile);