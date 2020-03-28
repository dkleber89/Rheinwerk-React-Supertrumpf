import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import Animal from '../game/Animal';
import List from './List';

export default function Admin(): ReactElement {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const cards = await axios.get<Animal[]>('http://localhost:3001/card');
      setAnimals(cards.data);
    }

    fetchData();
  }, [])

  return <List animals={animals} />;
}
