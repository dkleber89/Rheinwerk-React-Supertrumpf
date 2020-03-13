import { useEffect, useState } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import selectRandomProperty from './selectRandomProperty';
import Animal from './Animal';

export default () => {
  const [state, setState] = useState({
    playersTurn: true,
    player: [],
    computer: [],
    selectedProperty: '',
    computerUncovered: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001/card');
      dealCards(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (state.selectedProperty !== '') {
      setTimeout(() => {
        compare(state.selectedProperty);
      }, 2000);
    }
  }, [state.selectedProperty]);

  useEffect(() => {
    if (state.computerUncovered === false && state.selectedProperty === '' && state.playersTurn === false) {
      setTimeout(() => {
        const property = selectRandomProperty();
        play(property);
      });
    }
  }, [state.computerUncovered, state.selectedProperty, state.playersTurn]);
  const compare = property => {
    let { playersTurn } = state;

    const firstPlayer = state.player[0];
    let player = update(state.player, { $splice: [[0, 1]] });
    const firstComputer = state.computer[0];
    let computer = update(state.computer, { $splice: [[0, 1]] });

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

    setState(prevState => update(prevState, { $set: { computerUncovered: false, selectedProperty: '', playersTurn, player, computer } }));
  };

  const play = property => {
    setState(prevState => update(prevState, { selectedProperty: { $set: property }, computerUncovered: { $set: true } }));
  };

  const dealCards = cards => {
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

    setState(prevState => update(prevState, { computer: { $set: computer }, player: { $set: player } }));
  };

  return [state, play];
};
