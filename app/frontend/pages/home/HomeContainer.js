import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import HomeComponent from './components/HomeComponent';
import {browserHistory} from 'react-router';
import {showModal} from '../../shared/actions/Application';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.onModalClick = this.onModalClick.bind(this);
  }

  onQuestionsClick() {
    browserHistory.push('/questions');
  }

  onModalClick() {
    const action = null;
    const params = null;
    const header = 'HELLO';
    const body   = 'I am here to say hello';
    this.props.showModal({action, params, header, body});
  }

  render() {
    return (
      <div className="home" style={{backgroundImage: 'url("/assets/images/banner.png")'}}>
        <Helmet
          title="Intro"
        />
        <HomeComponent callbackOne={this.onQuestionsClick}
                       callbackTwo={this.onModalClick}>
        </HomeComponent>
      </div>
    );
  }
}

HomePage.propTypes = {
  'showModal': PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {showModal})(HomePage);
