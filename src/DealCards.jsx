import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import Animal from './Animal';

export default class DealCards extends React.Component {
  state = {
    computer: [],
    player: [],
  };

  componentDidMount = async () => {
    const { data } = await axios.get('http://localhost:3001/card');

    this.dealCards(data);
  };

  dealCards = cards => {
    const computer = [];
    const player = [];

    cards.forEach((card, index) => {
      const animal = new Animal(card.name, card.image, card.size, card.weight, card.age, card.offspring, card.speed);

      if (index % 2 === 0) {
        computer.push(animal);
      } else {
        player.push(animal);
      }
    });

    this.setState(state => update(state, { computer: { $set: computer }, player: { $set: player } }));
  };

  render = () => {
    const { computer, player } = this.state;

    return this.props.children(computer, player);
  };
}
