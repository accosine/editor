import React, { Component } from 'react';
import PropTypes from 'prop-types';

const FirebaseComponent = ComponentToWrap => {
  return class FirebaseComponent extends Component {
    static contextTypes = {
      firebase: PropTypes.object.isRequired,
    };
    render() {
      const { firebase } = this.context;
      return <ComponentToWrap {...this.props} firebase={firebase} />;
    }
  };
};
export default FirebaseComponent;
