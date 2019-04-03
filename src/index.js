import React from 'react';
import ReactDOM from 'react-dom';

const title = <h1>iReporter</h1>;

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();
