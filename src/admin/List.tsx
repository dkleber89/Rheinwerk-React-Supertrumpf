import React, { ReactElement, useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, TableSortLabel } from '@material-ui/core';
import Animal from '../game/Animal';

interface Props {
  animals: Animal[];
}

export default function List({ animals }: Props): ReactElement {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<{ orderBy: keyof Animal; order: 'asc' | 'desc' }>({ orderBy: 'name', order: 'asc' });

  const createSortHandler = (columnId: keyof Animal) => {
    return () => {
      setSort(prevState => ({
        orderBy: columnId,
        order: prevState.order === 'asc' ? 'desc' : 'asc',
      }));
    };
  };

  return (
    <Paper>
      <TextField label="Liste filtern" value={filter} onChange={e => setFilter(e.currentTarget.value)} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel active={sort.orderBy === 'name'} direction={sort.order} onClick={createSortHandler('name')}>
                Name
              </TableSortLabel>
            </TableCell>
            {Object.keys(Animal.properties).map(property => (
              <TableCell align="right" key={property}>
                <TableSortLabel active={sort.orderBy === property} direction={sort.order} onClick={createSortHandler(property as keyof Animal)}>
                  {Animal.properties[property].label}
                  {Animal.properties[property].unit !== '' && ` (${Animal.properties[property].unit})`}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {animals
            .filter(animal => animal.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((animalA: Animal, animalB: Animal) => {
              let result = 0;

              if (animalB[sort.orderBy]! < animalA[sort.orderBy]!) {
                result = -1;
              }

              if (animalB[sort.orderBy]! > animalA[sort.orderBy]!) {
                result = 1;
              }

              return sort.order === 'asc' ? result * -1 : result;

            })
            .map(animal => (
              <TableRow key={animal.id}>
                <TableCell>{animal.name}</TableCell>
                {Object.keys(Animal.properties).map(property => (
                  <TableCell align="right" key={property}>
                    {animal[property as keyof Animal]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
