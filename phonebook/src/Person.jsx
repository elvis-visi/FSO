const Person = ({ person }) => {
  return <li key={person.name}>{person.name}</li>;
};

export default Person;
