import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';
import {hideModal} from '../../actions/Application';

class MessageModal extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const action = this.props.application.get('modalContent').get('action');
    const params = this.props.application.get('modalContent').get('params');
    action && action(params);
    this.props.hideModal();
  }

  render() {
    return (
      <div className='messageModal'>
        <Modal.Dialog className='message'>
          <Modal.Header>
            <Modal.Title>
              {this.props.application.get('modalContent').get('header')}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.props.application.get('modalContent').get('body')}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.onClick} bsStyle='success'>OKAY</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

MessageModal.propTypes = {
  'application': PropTypes.object.isRequired,
  'hideModal'  : PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    application: state.application
  };
}

export default connect(mapStateToProps, {
  hideModal
})(MessageModal);
