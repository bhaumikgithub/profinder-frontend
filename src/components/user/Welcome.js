import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// Import helper
import { fullName, authToken } from '../Helper';

// Import services
import { AuthService } from '../../services/Index';

// Import css
import '../../assets/css/login.css';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  
  getInitialState() {
    const initialState = {
      userName: '',
      redirectToReferrer: false
    };
    
    return initialState;
  }
  
  componentWillMount() {
    var userName = fullName()
    this.setState({userName: userName})
  }
  
  handleLogout(event) {
    var self = this;
    AuthService.LogoutService({ token: authToken() }).then(function(response) {
      self.handleResponse(response);
    });
  }

  handleResponse(response) {
    if (response.status === 200) {
      localStorage.clear();
      this.setState({ redirectToReferrer: true });
    }
  }
  
  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="welcome-wrap">
        <h1>Welcome!! {this.state.userName}
          <Button
            className="logout-btn btn btn-orange"
            onClick={event => this.handleLogout(event)}
          >
            <i className="fa fa-logout" /> Logout
          </Button>
        </h1>
      </div>
      
    );
  }
}
