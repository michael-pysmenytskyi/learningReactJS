import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from './App';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router'

import { changeLogin } from '../actions/app'

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
        {isLoggedIn && <Route path="/" component={App} />}
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
    changeLogin
  }, dispatch)
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Root));