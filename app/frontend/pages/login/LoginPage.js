import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

import {login} from '../../shared/actions/Auth';
import LoginComponent from './components/LoginComponent';
import {browserHistory} from 'react-router';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.loginAttempt = this.loginAttempt.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.loginFailure = this.loginFailure.bind(this);
  }

  loginAttempt(params) {
    this.props.login(
      params,
      this.loginSuccess,
      this.loginFailure
    );
  }

  loginSuccess() {
    browserHistory.push(this.props.application.get('routeRequested') || '/');
  }

  loginFailure() {
    return;
  }

  render() {
    return (
      <div>
        <Helmet
          title="Login"
        />
        <LoginComponent callback={this.loginAttempt}/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  'login'      : PropTypes.func.isRequired,
  'application': PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {application: state.application};
}

export {LoginPage};
export default connect(mapStateToProps, {login})(LoginPage);
