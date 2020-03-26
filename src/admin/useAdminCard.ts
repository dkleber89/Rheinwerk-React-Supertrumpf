import Animal from '../game/Animal';
import { ChangeEvent, useState, useCallback } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import update from 'immutability-helper';

export default function useAdminCard(
  initialAnimal: Animal = new Animal('', '', 0, 0, 0, 0, 0)
): [Animal, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [animal, setAnimal] = useState<Animal>(initialAnimal);

  const changeProperty = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setAnimal(prevState => update(prevState, { [event.currentTarget.id]: { $set: event.currentTarget.value } }));
  }, []);

  return [animal, changeProperty];
}
