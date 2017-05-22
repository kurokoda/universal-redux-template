import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

import {loadQuestions} from './actions/questions';
import Questions from './components/Questions';

class QuestionsPage extends Component {
  static fetchData({store}) {
    return store.dispatch(loadQuestions());
  }

  componentDidMount() {
    if (!this.props.questions.size) {
      this.props.loadQuestions();
    }
  }

  render() {
    return (
      <div>
        <Helmet
          title="Questions"
        />
        <h2>Question</h2>
        <Questions questions={this.props.questions}/>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}

QuestionsPage.propTypes = {
  'loadQuestions': PropTypes.func.isRequired,
  'questions'    : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {questions: state.questions};
}

export {QuestionsPage};
export default connect(mapStateToProps, {loadQuestions})(QuestionsPage);
