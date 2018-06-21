import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUp } from '../actions/app'

class SignUp extends Component {
  state = {
      name : '',
      email: '',
      pass: '',
      pass2: '',
      errorMessage: ''
  };
  signUp = () => {
    const { name, email, pass, pass2 } = this.state;
    const { signUp, history } = this.props;
      if(email === '' || pass === '' || name === ''){
          this.incorrectInput("Enter all required data");
      }else if(pass !== pass2){
          this.incorrectInput("Passwords don't match");
      }
      else
          signUp({ name, email, pass }, history);
  };
  incorrectInput = (err) => {
        this.setState({
           errorMessage: err
        });
    };
  onInputChange = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { name, email, pass, pass2, errorMessage } = this.state;
    const { errors } = this.props;
      if(errors.message){
          this.incorrectInput(errors.message);
          errors.message = null;
      }

    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
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
                    <Input
                        title="Repeat your password"
                        onInputChange={(value) => {
                            this.onInputChange(value, 'pass2')
                        }}
                        value={pass2}
                        type="password"
                    />
                    <div className={"materialize-red-text"}>{errorMessage}</div>
                    <Button
                      title="Submit"
                      className = "btn waves-effect waves-light"
                      onClick={this.signUp}
                    />
                    <NavLink className = "right hide-on-med-and-down" to="/signIn">Already have account?</NavLink>
                </div>
            </div>
        </div>
    );
  }
}

function mapStoreToProps(store) {
  return {
    errors: store.app.errors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUp
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(SignUp);