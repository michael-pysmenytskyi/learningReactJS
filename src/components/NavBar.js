import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {logout} from '../actions/app';


class NavBar extends Component {
    logout = (history) => {
        const {logout} = this.props;
        logout(history);
    };

    render() {
        const {history} = this.props;
        return (
            <nav className = "nav-wrapper">
                <ul className="left hide-on-med-and-down">
                    <li>
                        <NavLink to="/">All Posts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/myPosts">My Posts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/addPost">Add Posts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/myProfile">My Profile</NavLink>
                    </li>
                </ul>
                <ul  className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/signIn" onClick={()=>{this.logout(history)}}>Logout</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(NavBar);