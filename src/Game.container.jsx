import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import GameComponent from './Game';
import selectRandomProperty from './selectRandomProperty';

export default class Game extends React.Component {
  static defaultProps = {
    title: 'Supertrumpf',
  };

  static propTypes = {
    title: PropTypes.string,
  };

  state = {
    playersTurn: true,
    player: [],
    computer: [],
    selectedProperty: '',
    computerUncovered: false,
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.player.length === 0 && this.props.player.length > 0 && prevProps.computer.length === 0 && this.props.computer.length > 0) {
      this.setState(state => update(state, { player: { $set: this.props.player }, computer: { $set: this.props.computer } }));
    }
  };

  compare = property => {
    let playersTurn = this.state.playersTurn;

    const firstPlayer = this.state.player[0];
    let player = update(this.state.player, { $splice: [[0, 1]] });
    const firstComputer = this.state.computer[0];
    let computer = update(this.state.computer, { $splice: [[0, 1]] });

    if (firstPlayer[property] > firstComputer[property]) {
      playersTurn = true;

      player = update(player, { $push: [firstPlayer, firstComputer] });

      if (computer.length === 0) {
        alert('Player wins');
        return;
      }
    } else if (firstPlayer[property] < firstComputer[property]) {
      playersTurn = false;

      computer = update(computer, { $push: [firstPlayer, firstComputer] });

      if (player.length === 0) {
        alert('Computer wins');
        return;
      }
    } else {
      player = update(player, { $push: [firstPlayer] });
      computer = update(computer, { $push: [firstComputer] });
    }

    this.setState(
      state => update(state, { $set: { computerUncovered: false, selectedProperty: '', playersTurn, player, computer } }),
      () => {
        if (!playersTurn) {
          setTimeout(() => {
            const property = selectRandomProperty();
            this.play(property);
          }, 2000);
        }
      }
    );
  };

  play = property => {
    this.setState(
      state => update(state, { selectedProperty: { $set: property }, computerUncovered: { $set: true } }),
      () => {
        setTimeout(() => {
          this.compare(property);
        }, 2000);
      }
    );
  };

  render() {
    return <GameComponent {...this.state} title={this.props.title} play={this.play} />;
  }
}
