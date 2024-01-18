import { useState } from "react";

const Button = ({ handler, text }) => {
  return <button onClick={handler}> {text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = function () {
    setGood(good + 1);
  };
  const handleNeutral = function () {
    setNeutral(neutral + 1);
  };
  const handleBad = function () {
    setBad(bad + 1);
  };

  const total = good + bad + neutral;

  return (
    <div>
      <h2>give feedback</h2>
      <Button handler={handleGood} text="good" />
      <Button handler={handleNeutral} text="neutral" />
      <Button handler={handleBad} text="bad" />

      <h3>Statistics</h3>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good - bad) / total}</p>
      <p>positive {(good / total) * 100} % </p>
    </div>
  );
};

export default App;
