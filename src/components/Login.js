import React, { Component } from 'react';
import {
  Button,
  FormControl,
  Grid,
  Col,
  Row,
  FormGroup
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

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
      loginForm: {
        email: '',
        password: '',
        grant_type: 'password',
        provider : '',
        login_type: '',
        access_token: ''
      },
      login_error: '',
      redirectToReferrer: false
    };

    return initialState;
  }

  handleChange(e) {
    const loginForm = this.state.loginForm;
    var key = e.target.name;
    loginForm[key] = e.target.value;
    this.setState({
      loginForm
    });
  }

  handleLogin(event) {
    var self = this;
    event.preventDefault();
    AuthService.LoginService(self.state.loginForm)
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        self.setState({ login_error: error.response.data.error });
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      localStorage.setItem('AUTH_TOKEN', response.data.data.token.access_token);
      localStorage.setItem(
        'CURRENT_USER',
        JSON.stringify(response.data.data.user)
      );
      this.setState({ redirectToReferrer: true });
    } else {
      console.log('Invalid email and password');
      alert('Invalid email and password');
    }
  }
  responseFacebook = (response) => {
    console.log(response);
    var self = this
    const loginForm = self.state.loginForm;
    loginForm['access_token'] = response['accessToken']
    loginForm['provider'] = 'facebook'
    loginForm['login_type'] = "1"
    self.setState({ loginForm })
    AuthService.LoginService(self.state.loginForm)
    .then(function(response) {
      self.handelResponse(response);
    })
    .catch(function(error) {
      self.setState({ login_error: error.response.data.error });
    });
  }

  responseGoogle = (response) => {
    console.log(response);
    var self = this
    const loginForm = self.state.loginForm;
    loginForm['access_token'] = response['accessToken']
    loginForm['provider'] = 'google'
    loginForm['login_type'] = "1"
    loginForm['google_id'] = response['profileObj']['googleId']
    loginForm['family_name'] = response['profileObj']['familyName']
    loginForm['given_name'] = response['profileObj']['givenName']
    loginForm['image'] = response['profileObj']['imageUrl']
    self.setState({ loginForm })
    AuthService.LoginService(self.state.loginForm)
    .then(function(response) {
      self.handelResponse(response);
    })
    .catch(function(error) {
      self.setState({ login_error: error.response.data.error });
    });
  }

  render() {
    const { login_error } = this.state;
    if (isLoggedIn() || this.state.redirectToReferrer) {
      return <Redirect push to="/welcome" />;
    }

    return (
      <div className="login-wrap">
        <Grid className="page-inner-wrap">
          <Row>
            <Col xs={10} sm={6} className="login-form">
              <form
                className="admin-login-side"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    this.handleLogin(e);
                  }
                }}
                onSubmit={event => {
                  this.handleLogin(event);
                }}
              >
                <Col xs={12} sm={10} md={8} className="login-details-block">
                  <FormGroup className="custom-fromgrp">
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
                  {login_error && (
                    <span className="input-error text-red">{login_error}</span>
                  )}
                </Col>
                <Button
                  type="submit"
                  className="btn-orange login-btn text-center"
                >
                  LOGIN<img
                    src={require('../assets/images/login/next-icon.png')}
                    alt="Logo"
                    className="img-responsive arrow-icon"
                  />
                </Button>
                <FacebookLogin
                  appId="709825285894910"
                  autoLoad={true}
                  fields="name,email,picture"
                  cssClass="my-facebook-button-class"
                  icon="fa-facebook"
                  callback={this.responseFacebook.bind(this)} 
                />
                <GoogleLogin
                  clientId="209767172884-6inccd12fnupj9rducn5h46k3u6q1h4r.apps.googleusercontent.com"
                  buttonText="Login With Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
