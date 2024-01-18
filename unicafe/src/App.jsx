import { useState } from "react";

const Button = ({ handler, text }) => {
  return <button onClick={handler}> {text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <h3>Statistics</h3>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="total" value={total} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={`${positivePercentage} %`} />
    </div>
  );
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

  return (
    <div>
      <h2>give feedback</h2>
      <Button handler={handleGood} text="good" />
      <Button handler={handleNeutral} text="neutral" />
      <Button handler={handleBad} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
