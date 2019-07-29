import React from 'react';
import ReactDOM from 'react-dom';
import App1 from './App1';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App1 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
