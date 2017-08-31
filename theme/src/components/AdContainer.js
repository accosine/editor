import React from 'react';
import PropTypes from 'prop-types';
import { oneLine } from 'common-tags';
const AdContainer = ({ adnetwork, adslot }) =>
  <div className="ad--container">
    <amp-ad width={300} height={250} type={adnetwork} data-slot={adslot} />
  </div>;

AdContainer.propTypes = {
  adnetwork: PropTypes.string.isRequired,
  adslot: PropTypes.string.isRequired,
};
export default AdContainer;
