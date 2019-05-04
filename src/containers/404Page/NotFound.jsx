/* eslint-disable global-require */
import React from 'react';


const notFound = () => (
  <div className="notfound-container">
    <img src={require('../../../public/images/404-error-template-9.png')} alt="" className="img-fluid" />
  </div>

);

export default notFound;
