import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import Posts from './Posts';
import UserPosts from './UserPosts'
import AddOrEditPosts from './AddOrEditPosts';
import UserProfile from './UserProfile';
import ViewPosts from './ViewPosts';

class App extends Component {
  render() {
    return (
      <Fragment>
          <NavBar/>
        <Switch>
            <Route exact path="/" component={Posts}/>
            <Route exact path="/myPosts" component={UserPosts}/>
            <Route exact path="/addPost" component={AddOrEditPosts}/>
            <Route path="/posts/:id" component={ViewPosts}/>
            <Route path="/editPost/:id" component={AddOrEditPosts}/>
            <Route path="/myProfile" component={UserProfile} />
        </Switch>
      </Fragment>
    );
  }
}
export default connect()(App);
