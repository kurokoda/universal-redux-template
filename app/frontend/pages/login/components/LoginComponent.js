import _ from 'lodash';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {TextInput, PasswordInput} from '../../../shared/elements/inputs/inputs';
import Validation from '../../../shared/validation/service';
import {required, minLength} from '../../../shared/validation/rules';
import update from 'immutability-helper';

const fieldValidations = [
  Validation.set('username', 'Username', required, minLength(3)),
  Validation.set('password', 'Password', required)
];

class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.initHandlers();
    this.initState();
  }

  componentDidMount() {
    this.setState({validationErrors: Validation.run(this.state, fieldValidations)});
  }

  getErrorFor(field) {
    return this.state.validationErrors[field];
  }

  initHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange     = this.onChange.bind(this);
  }

  initState() {
    this.state = {
      showErrors      : false,
      validationErrors: {},

      username: '',
      password: '',
    };
  }

  onChange(event) {
    event.preventDefault();
    let newState              = update(this.state, {
      [event.target.id]: {$set: event.target.value}
    });
    newState.validationErrors = Validation.run(newState, fieldValidations);
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({showErrors: true});
    if (!_.isEmpty(this.state.validationErrors)) return null;
    this.props.callback(
      {
        username: this.state.username,
        password: this.state.password
      }
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
           <TextInput value={this.state.username}
                      onChange={this.onChange}
                      showError={this.state.showErrors}
                      errorText={this.getErrorFor('username')}
                      label='Username'
                      id='username'/>

            <PasswordInput value={this.state.password}
                          onChange={this.onChange}
                          showError={this.state.showErrors}
                          errorText={this.getErrorFor('password')}
                          label='Password'
                          id='password'/>

          <Button className="btn-block"
                  bsStyle='success'
                  type='submit'>
            LOG IN
          </Button>
        </form>
      </div >
    );
  }
}

LoginComponent.propTypes = {
  'callback': PropTypes.func.isRequired,
};

export default LoginComponent;
