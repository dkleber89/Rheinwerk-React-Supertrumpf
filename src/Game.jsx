import React from 'react';
import PropTypes from 'prop-types';

import './Game.css';
import Card from './Card';
import useCards from './useCards';

export default function Game({ title }) {
  const [state, play] = useCards();

  return (
    <>
      <h1>{title}</h1>
      <div className="info">{`${state.playersTurn ? 'Du bist' : 'Der Computer ist'} an der Reihe`}</div>
      <div className="cards">
        {state.player[0] && <Card uncovered={true} animal={state.player[0]} selectedProperty={state.selectedProperty} onSelectProperty={play} />}
        {state.computer[0] && <Card uncovered={state.computerUncovered} animal={state.computer[0]} selectedProperty={state.selectedProperty} />}
      </div>
    </>
  );
}

Game.propTypes = {
  title: PropTypes.string.isRequired,
};
