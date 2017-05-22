import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import MessageModal from '../elements/modals/MessageModal';
import LoadingModal from '../elements/modals/LoadingModal';
import DevTools from '../components/DevTools';

const isProduction = process.env.NODE_ENV === 'production';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet
          defaultTitle="Application Template"
          titleTemplate="%s - Application Template"
          meta={[
            {
              'name'   : 'description',
              'content': 'A boilerplate doing universal/isomorphic rendering with Redux + React-router + Express'
            }
          ]}
          htmlAttributes={{'lang': 'en'}}
        />
        {this.props.application.get('modalContent') && <MessageModal/>}
        {this.props.children}
        {this.props.application.get('isLoading') && <LoadingModal/> }
        {<DevTools />}
        {/* {!isProduction && <DevTools />}*/}
      </div>
    );
  }
}

App.propTypes = {
  'application': PropTypes.object.isRequired,
  'children'   : PropTypes.object.isRequired,
  'state'      : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    state      : state,
    application: state.application
  };
}

export default connect(mapStateToProps)(App);
