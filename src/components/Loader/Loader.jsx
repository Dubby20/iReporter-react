import React from 'react';
import spinner from '../../../public/images/spinner.gif';

const Loader = () => (
  <div className="loader">
    <img src={spinner} alt="loader" />
  </div>
);

export default Loader;