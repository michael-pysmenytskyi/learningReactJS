import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp } from '../actions/app'

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    pass: ''
  };
  signUp = () => {
    const { name, email, pass } = this.state;
    const { signUp, history } = this.props;

    signUp({ name, email, pass }, history);
  };

  onInputChange = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { name, email, pass } = this.state;

    return (<div>
        <h1>Sign Up</h1>
          <Input
              title="Name"
              onInputChange={(value) => {
                  this.onInputChange(value, 'name')
              }}
              value={name}
          />
          <Input
          title="Email"
          onInputChange={(value) => {
            this.onInputChange(value, 'email')
          }}
          value={email}
        />
        <Input
          title="Password"
          onInputChange={(value) => {
            this.onInputChange(value, 'pass')
          }}
          value={pass}
          type="password"
        />
        <Button
          title="Submit"
          onClick={this.signUp}
        />
        <NavLink to="/signIn">Already have account?</NavLink>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUp
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUp);