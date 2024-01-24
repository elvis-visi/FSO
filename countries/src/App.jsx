import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";
const App = () => {
  //component to control the input value
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filterChange = (event) => {
    //event.target -> input element
    console.log(event.target.value);
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setResults(response.data);
        // console.log(response.data[0].name.common);
      });
  }, []);

  //get all countries name into results
  //showing more info -> make individual calls
  const countries = results.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  //whenever the filter changes we want to make calls to the api
  //or fetch all countries initially then filter
  const showCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      find countries <input value={filter} onChange={filterChange} />
      <div>
        {filter && countries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countries.length === 1 ? (
          <Country country={countries[0]} />
        ) : (
          //if 10 or less countries list them
          filter &&
          countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => showCountry(country)}>show</button>
              {selectedCountry === country && <Country country={country} />}
            </li>
          ))
        )}
      </div>
    </div>
  );
};

export default App;

//(over 10) countries that match the query, then the user is prompted to
//make their query more specific:
