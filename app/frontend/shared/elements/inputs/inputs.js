import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl} from 'react-bootstrap';

const defaultPropTypes = {
  'className'  : PropTypes.string,
  'errorText'  : PropTypes.string,
  'id'         : PropTypes.string.isRequired,
  'label'      : PropTypes.string.isRequired,
  'onBlur'     : PropTypes.func,
  'onChange'   : PropTypes.func.isRequired,
  'placeholder': PropTypes.func,
  'showError'  : PropTypes.bool.isRequired,
  'value'      : PropTypes.string.isRequired,
};

export class PasswordInput extends Component {
  render() {
    return (
      <div className='form-group'>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          type='password'
          value={this.props.value}
          className={'form-control ' + this.props.className}
          name={this.props.id}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}/>
        <div className={'validation-error ' + (this.props.showError ? 'show' : 'hidden')}>
          <span className='text'>{this.props.errorText}</span>
        </div>
      </div>
    );
  }
}

export class TextInput extends Component {
  render() {
    return (
      <div className='form-group'>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          type='text'
          value={this.props.value}
          className={'form-control ' + this.props.className}
          name={this.props.id}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
        <div className={'validation-error ' + (this.props.showError ? 'show' : 'hidden')}>
          <span className='text'>{this.props.errorText}</span>
        </div>
      </div>
    );
  }
}

PasswordInput.propTypes = TextInput.propTypes = defaultPropTypes;

