import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  LoginLayout,
  Login,
  SignUp,
  Confirmation,
  NotFound,
  PrivateRoute,
  Welcome
} from './Index';

const routes = () => (
  <Switch>
    {/* Auth routes start */}
    <LoginLayout exact path="(/*)" component={Login} />
    <LoginLayout exact path="(/*/signup)" component={SignUp} />
    <LoginLayout exact path="(/*/Confirmation)" component={Confirmation} />
    {/* Auth routes end */}

    {/* After Login routes start */}
    <PrivateRoute
      exact
      path="(/*)/welcome"
      title="Welcome"
      component={Welcome}
    />
    {/* After Login routes end */}
    <Route component={NotFound} />
  </Switch>
);

export default routes;
