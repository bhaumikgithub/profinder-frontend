import React, { Component } from 'react';
import {
  Button,
  FormControl,
  Grid,
  Col,
  Row,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// Import helper
import { isLoggedIn } from './Helper';

// Import css
import '../assets/css/login.css';

// Import services
import { AuthService } from '../services/Index';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      signUpForm: {
        email: '',
        password: '',
        confirm_password: '',
        interest: '',
        area: '',
        first_name: '',
        last_name: ''
      },
      signUp_error: '',
      redirectToReferrer: false
    };

    return initialState;
  }

  handleChange(e) {
    const signUpForm = this.state.signUpForm;
    var key = e.target.name;
    signUpForm[key] = e.target.value;
    this.setState({
      signUpForm
    });
  }

  handleSignUp(event) {
    var self = this;
    event.preventDefault();
    AuthService.SignUpService({user: self.state.signUpForm})
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        self.setState({ signUp_error: error.response.data.error });
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      this.setState({ redirectToReferrer: true });
    } else {
      console.log('Invalid email and password');
      alert('Invalid email and password');
    }
  }

  render() {
    const { signUp_error } = this.state;
    if (isLoggedIn() || this.state.redirectToReferrer) {
      return <Redirect push to="/Confirmation" />;
    }

    return (
      <div className="login-wrap">
        <Grid className="page-inner-wrap">
          <Row>
            <Col xs={10} sm={6} className="login-form">
              <h1 className="profinder-heading">Profinder</h1>
              <form
                className="admin-login-side"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    this.handleSignUp(e);
                  }
                }}
                onSubmit={event => {
                  this.handleSignUp(event);
                }}
              >
                <Col xs={12} sm={10} md={8} className="login-details-block">
                  <FormGroup className="custom-fromgrp">
                    <ControlLabel className="custom-form-control-label signup-form-label">
                      Email:
                    </ControlLabel>
                    <FormControl
                      className="login-control"
                      type="email"
                      placeholder="Email"
                      label="email"
                      name="email"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <ControlLabel className="custom-form-control-label signup-form-label">
                      Password:
                    </ControlLabel>
                    <FormControl
                      className="login-control"
                      type="password"
                      placeholder="Password"
                      label="password"
                      name="password"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <ControlLabel className="custom-form-control-label signup-form-label">
                      Confirm Password:
                    </ControlLabel>
                    <FormControl
                      className="login-control"
                      type="password"
                      placeholder="Confirm Password"
                      label="password"
                      name="confirm_password"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <ControlLabel className="custom-form-control-label signup-form-label">
                      First Name:
                    </ControlLabel>
                    <FormControl
                      className="login-control"
                      type="text"
                      placeholder="First name"
                      label="first name"
                      name="first_name"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <ControlLabel className="custom-form-control-label signup-form-label">
                      Last Name:
                    </ControlLabel>
                    <FormControl
                      className="login-control"
                      type="text"
                      placeholder="Last name"
                      label="last name"
                      name="last_name"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <ControlLabel className="custom-form-control-label signup-form-label">
                      Interest:
                    </ControlLabel>
                    <FormControl
                      className="login-control"
                      type="text"
                      placeholder="Interest"
                      label="interest"
                      name="interest"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <ControlLabel className="custom-form-control-label signup-form-label">
                      Area:
                    </ControlLabel>
                    <FormControl
                      className="login-control"
                      type="text"
                      placeholder="Area"
                      label="area"
                      name="area"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  {signUp_error && (
                    <span className="input-error text-red">{signUp_error}</span>
                  )}
                </Col>
                <Button
                  type="submit"
                  className="btn-orange login-btn text-center"
                >
                  SignUp<img
                    src={require('../assets/images/login/next-icon.png')}
                    alt="Logo"
                    className="img-responsive arrow-icon"
                  />
                </Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
