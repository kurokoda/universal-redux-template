import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

class HomeComponent extends Component {
  render() {
    return (
      <div>
        <h1>Intro Page</h1>
        <div>
          <img src="/assets/images/head.png"/>
        </div>
        <Button bsStyle="primary" onClick={this.props.callbackOne}>Questions</Button>
        <Button bsStyle="primary" onClick={this.props.callbackTwo}>Modal</Button>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  'callbackOne': PropTypes.func.isRequired,
  'callbackTwo': PropTypes.func.isRequired
};

export default HomeComponent;
