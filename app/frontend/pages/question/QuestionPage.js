import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {browserHistory} from 'react-router';

import {loadQuestion, purgeQuestion} from '../questions/actions/questions';

class QuestionPage extends Component {
  static fetchData({store, params, history}) {
    const {id} = params;
    return store.dispatch(loadQuestion({id, history}));
  }

  componentDidMount() {
    const {id} = this.props.params;
    if (!this.props.question
      || this.props.question.get('id') !== this.props.params.id) {
      this.props.purgeQuestion();
      this.props.loadQuestion({id, history: browserHistory});
    }
  }

  render() {
    const {question} = this.props;
    return (
      <div>
        <Helmet
          title={'Question ' + this.props.params.id}
        />
        <h2>{ question.get('content') }</h2>
        <h3> User: {question.getIn(['user', 'name'])} </h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {question: state.question};
}

QuestionPage.propTypes = {
  'loadQuestion' : PropTypes.func.isRequired,
  'purgeQuestion': PropTypes.func.isRequired,
  'question'     : PropTypes.object.isRequired,
  'params'       : PropTypes.object.isRequired,
  'params.id'    : PropTypes.string
};

export {QuestionPage};
export default connect(
  mapStateToProps,
  {
    loadQuestion,
    purgeQuestion
  }
)(QuestionPage);
