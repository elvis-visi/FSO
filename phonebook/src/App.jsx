import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  useEffect(() => {
    //get request to the json server
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    console.log("event target  ", event.target);

    //check whether the name exists in the phonebook
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const duplicate = persons.some((per) => per.name === newPerson.name);

    if (!duplicate) {
      personsService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(`${newPerson.name} is already in the phonebook`);
    }
  };

  const handleChangeName = (event) => {
    console.log("event target ", event.target);
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    console.log("event target ", event.target);
    setNewNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((per) => per.id === id);

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((per) => per.id !== id)))
        .catch((error) => {
          alert(
            `The person '${personToDelete.name}' was already deleted from the server.`
          );
          setPersons(persons.filter((per) => per.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handler={handleChangeFilter} />
      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
