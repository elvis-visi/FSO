//receive phonebook, display all the members
import Person from "./Person";

const Persons = ({ persons, filter }) => {
  const phonesToShow =
    filter.length === 0
      ? persons
      : persons.filter((per) =>
          per.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <ul>
      {phonesToShow.map((per) => (
        <Person key={per.name} person={per} />
      ))}
    </ul>
  );
};

export default Persons;
