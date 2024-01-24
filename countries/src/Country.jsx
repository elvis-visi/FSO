const Country = ({ country }) => {
  console.log("country", country);

  return (
    <div>
      <h2>{country.name.official}</h2>
      <div> capital {country.capital[0]}</div>
      <div> area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`${country.name.common} Flag`}
        style={{ width: "200px", height: "auto" }}
      />
    </div>
  );
};

export default Country;
