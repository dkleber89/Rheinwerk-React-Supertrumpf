import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import './App.css';
// import Game from './game/Game';
// import DarkMode from './game/DarkMode';
// import Login from './login/Login';
import Axios from 'axios';
// import Form from './admin/Form';
import Admin from './admin/Admin';

interface State {
  darkMode: boolean;
  loggedIn: boolean;
  error: string;
}

export default class App extends React.Component<{}, State> {
  state = {
    darkMode: false,
    loggedIn: false,
    error: '',
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode }));
  };

  handleLogin = async (username: string, password: string) => {
    const result = await Axios.post('http://localhost:3001/login', { username, password });

    let login = false;
    let error = 'Anmeldung fehlgeschlagen';

    if (result.data === true) {
      login = true;
      error = '';
    }

    this.setState(prevState => update(prevState, { loggedIn: { $set: login }, error: { $set: error } }));
  };

  render() {
    return <Admin />;
    /*     return (
      <DarkMode.Provider value={this.state.darkMode}>
        {this.state.loggedIn && (
          <>
            <button onClick={this.toggleDarkMode}>Toggle Dark Mode</button>
            <Game title="Supertrumpf" />}{' '}
          </>
        )}
        {!this.state.loggedIn && <Login onLogin={this.handleLogin} error={this.state.error} />}
      </DarkMode.Provider>
    ); */
  }
}
