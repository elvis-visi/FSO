const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
      <button> delete</button>
    </li>
  );
};

export default Person;
