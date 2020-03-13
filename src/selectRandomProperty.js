import Animal from './Animal';

export default () => {
  const properties = Object.keys(Animal.properties);
  const index = Math.floor(Math.random() * properties.length);

  return properties[index];
};
