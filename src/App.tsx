import React from 'react';
import update from 'immutability-helper';

import './App.css';
import Game from './game/Game';
import DarkMode from './game/DarkMode';
import Login from './login/Login';
import Axios from 'axios';

interface State {
  darkMode: boolean;
  loggedIn: boolean;
}

export default class App extends React.Component<{}, State> {
  state = {
    darkMode: false,
    loggedIn: false,
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode }));
  };

  handleLogin = async (username: string, password: string) => {
    const result = await Axios.post('http://localhost:3001/login', { username, password });

    if (result.data) {
      this.setState(prevState => update(prevState, { loggedIn: { $set: true } }));
    }
  };

  render() {
    return (
      <DarkMode.Provider value={this.state.darkMode}>
        {this.state.loggedIn && (
          <>
            <button onClick={this.toggleDarkMode}>Toggle Dark Mode</button>
            <Game title="Supertrumpf" />}{' '}
          </>
        )}
        {!this.state.loggedIn && <Login onLogin={this.handleLogin} />}
      </DarkMode.Provider>
    );
  }
}
