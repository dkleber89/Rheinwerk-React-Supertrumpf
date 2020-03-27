import Animal from '../game/Animal';
import { ChangeEvent, useState, useCallback } from 'react';
import update from 'immutability-helper';

export default function useCardAdmin(
  initialAnimal: Animal = new Animal('', '', 0, 0, 0, 0, 0)
): [Animal, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [animal, setAnimal] = useState<Animal>(initialAnimal);

  const changeProperty = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const id = event.currentTarget.id;
    let value: string | File = event.currentTarget.value;

    if (id === 'image') {
      value = event.currentTarget.files![0]
    }

    setAnimal(prevState => update(prevState, { [id]: { $set: value } }));
  }, []);

  return [animal, changeProperty];
}
