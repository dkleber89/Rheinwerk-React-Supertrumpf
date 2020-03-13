import React from 'react';

import Game from './Game';

export default class Error extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch = (error, errorInfo) => {
    console.log(error, errorInfo);
  };

  static getDerivedStateFromError = error => ({ error: error.message });

  render = () => {
    if (this.state.error) {
      return <div>Ein Fehler ist aufgetreten: {this.state.error}</div>;
    }

    return <Game title="Supertrumpf" />;
  };
}
