//receive phonebook, display all the members

const Persons = ({ persons, filter, handleDelete }) => {
  const phonesToShow =
    filter.length === 0
      ? persons
      : persons.filter((per) =>
          per.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <ul>
      {phonesToShow.map((per) => (
        <li key={per.id}>
          {per.name} {per.number}
          <button onClick={() => handleDelete(per.id)}> delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
