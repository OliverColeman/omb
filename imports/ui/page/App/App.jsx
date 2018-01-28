/* eslint-disable jsx-a11y/no-href */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';

import DocumentsCollection from '../../../api/Documents/Documents';

import Navigation from '../../nav/Navigation/Navigation';
import Authenticated from '../../nav/Authenticated/Authenticated';
import Public from '../../nav/Public/Public';
import Index from '../Index/Index';
import DocumentRoute from '../../nav/DocumentRoute/DocumentRoute';
import DocumentsList from '../../document/DocumentsList/DocumentsList';
import ViewDocument from '../../document/ViewDocument/ViewDocument';
import Signup from '../../account/Signup/Signup';
import Login from '../../account/Login/Login';
import Logout from '../../account/Logout/Logout';
import VerifyEmail from '../../account/VerifyEmail/VerifyEmail';
import RecoverPassword from '../../account/RecoverPassword/RecoverPassword';
import ResetPassword from '../../account/ResetPassword/ResetPassword';
import Profile from '../../account/Profile/Profile';
import NotFound from '../../nav/NotFound/NotFound';
import Footer from '../Footer/Footer';
import VerifyEmailAlert from '../../account/VerifyEmailAlert/VerifyEmailAlert';
import getUserName from '../../../modules/get-user-name';

import './App.scss';

const App = props => (
  <Router>
    {!props.loading ? (
      <div className="App">

        <Helmet>
          <title>{Meteor.settings.public.appName}</title>
          <meta name="description" content={Meteor.settings.public.appDescription} />
        </Helmet>

        {props.authenticated ?
          <VerifyEmailAlert
            userId={props.userId}
            emailVerified={props.emailVerified}
            emailAddress={props.emailAddress}
          />
          : ''}
        <Navigation {...props} />
        <Grid>
          <Switch>
            <Route exact name="index" path="/" component={Index} />
            <Authenticated exact path="/documents" component={DocumentsList} {...props} />
            <Authenticated exact path="/documents/:_id" component={DocumentRoute} docComponent={ViewDocument} collection={DocumentsCollection} goToOnRemove={'/documents'} {...props} />
            <Authenticated exact path="/profile" component={Profile} {...props} />
            <Public path="/signup" component={Signup} {...props} />
            <Public path="/login" component={Login} {...props} />
            <Route path="/logout" component={Logout} {...props} />
            <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
            <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
            <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
        <Footer />
      </div>
    ) : ''}
  </Router>
);

App.defaultProps = {
  userId: '',
  emailAddress: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
})(App);
