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
      ConfirmationForm: {
        confirmation_token: ''
      },
      confirmation_error: '',
      redirectToReferrer: false
    };

    return initialState;
  }

  handleChange(e) {
    const ConfirmationForm = this.state.ConfirmationForm;
    var key = e.target.name;
    ConfirmationForm[key] = e.target.value;
    this.setState({
      ConfirmationForm
    });
  }

  handleSignUp(event) {
    var self = this;
    event.preventDefault();
    AuthService.ConfirmationService(self.state.ConfirmationForm)
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        self.setState({ confirmation_error: error.response.data.error });
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      this.setState({ redirectToReferrer: true });
    } else {
      console.log('Invalid confirmation token');
      alert('Invalid confirmation token');
    }
  }

  render() {
    const { confirmation_error } = this.state;
    if (isLoggedIn() || this.state.redirectToReferrer) {
      return <Redirect push to="/" />;
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
                      Token:
                    </ControlLabel>
                    <FormControl
                      className="login-control"
                      type="text"
                      placeholder="Confirmation Token"
                      label="Token"
                      name="confirmation_token"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  {confirmation_error && (
                    <span className="input-error text-red">{confirmation_error}</span>
                  )}
                </Col>
                <Button
                  type="submit"
                  className="btn-orange login-btn text-center"
                >
                  Next<img
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
