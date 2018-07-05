import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signIn } from '../actions/app'

class SignIn extends Component {
  state = {
      email: '',
      pass: '',
      errorMessage: ''
  };
  signIn = () => {
    const { email, pass} = this.state;
    const { signIn, history } = this.props;
      if(email === '' || pass === ''){
          this.incorrectInput("Enter all required data");
      }else signIn({ email, pass }, history);
  };

  incorrectInput = (err) => {
      this.setState({
         errorMessage: err
      });
  };

  onInputChange = (value, key) => {
    this.setState({
        errorMessage: "",
        [key]: value
    });
  };

  render() {
    const { email, pass, errorMessage } = this.state;
    const { errors } = this.props;
    if(errors.message){
        this.incorrectInput(errors.message);
        errors.message = null;
    }
    return (
        <div className ="container">
            <div className="row">
                <div className="col s6">
                    <h1>Sign In</h1>
                    <Input
                        type={"email"}
                        title="Email"
                        onInputChange={(value) => {
                            this.onInputChange(value, 'email')
                      }}
                      value={email}
                    />
                    <Input
                      title="Password"
                      type={"password"}
                      onInputChange={(value) => {
                        this.onInputChange(value, 'pass')
                      }}
                      value={pass}
                    />
                    <div className={"materialize-red-text"}>{errorMessage}</div>
                    <Button
                      title="Submit"
                      className = "btn waves-effect waves-light"
                      onClick={this.signIn}
                    />

                    <NavLink to="/signUp" className="right hide-on-med-and-down">Don't have account?</NavLink>
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
    signIn
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(SignIn);