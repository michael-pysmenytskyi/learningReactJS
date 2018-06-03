import React, { Component } from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/app'


class MainMenu extends Component {
    logout = () => {
        logout();
    };
    render() {
        return (<div>
                <h1>Menu</h1>
                <NavLink to="/users">All users</NavLink>
                <NavLink to="/posts">All posts</NavLink>
                <Button
                    title="Logout"
                    onClick={this.logout}
                />
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(MainMenu);