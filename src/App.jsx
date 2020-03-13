import React from 'react';

import './App.css';
import Error from './Error';
import DarkMode from './DarkMode';

export default class App extends React.Component {
  state = {
    darkMode: false,
  };

  toggleDarkMode = () => {
    this.setState(state => ({ darkMode: !state.darkMode }));
  };

  render = () => (
    <DarkMode.Provider value={this.state.darkMode}>
      <button onClick={this.toggleDarkMode}>Toggle Dark Mode</button>
      <Error />
    </DarkMode.Provider>
  );
}
