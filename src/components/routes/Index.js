import asyncComponent from '../AsyncComponent';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../Helper';

const LoginLayout = asyncComponent(() => import('../layout/LoginLayout'));

const AfterLoginLayout = asyncComponent(() =>
import('../layout/AfterLoginLayout')
);

const Login = asyncComponent(() => import('../Login'));

const SignUp = asyncComponent(() => import('../SignUp'));

const Confirmation = asyncComponent(() => import('../Confirmation'));

// Import not found component
const NotFound = asyncComponent(() => import('../NotFound'));


// Import after login component
const Welcome = asyncComponent(() => import('../user/Welcome'));
// Is request route is private or not
const PrivateRoute = ({ component: Component, title, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <AfterLoginLayout title={title}>
          <Component {...props} />
        </AfterLoginLayout>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )}
  />
);

export {
  LoginLayout,
  NotFound,
  Login,
  SignUp,
  Welcome,
  Confirmation,
  PrivateRoute,
  AfterLoginLayout
};
