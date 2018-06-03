import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainMenu from "./MainMenu";
import Users from './Users';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Posts from  './Posts';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router'



class Root extends Component {
  componentDidMount() {
    const { isLoggedIn, history } = this.props;
    if (!isLoggedIn) {
      history.push('/signIn')
    }
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route exact path="/mainMenu" component={MainMenu} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signIn" component={SignIn} />
      </Switch>
    );
  }
}

function mapStoreToProps(store) {
  return {
    isLoggedIn: store.app.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Root));