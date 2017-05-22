import React, {Component} from 'react';

class LoadingModal extends Component {

  render() {
    return (
      <div className="loadingModal">
        <img src="/assets/images/loadingModal.gif" alt="loading"/>
      </div>
    );
  }
}

export default LoadingModal;
