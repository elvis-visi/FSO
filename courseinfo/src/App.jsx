const Header = (props) => {
  console.log("Header props ", props);
  return <h1>{props.course}</h1>;
};

//pass an array as props
const Content = (props) => {
  console.log("content arr: ", props.arr);
  return (
    <>
      {/* {props.part} {props.exercise} */}

      <Part part={props.arr[0].part1} exercise={props.arr[0].exercises1} />
      <Part part={props.arr[1].part2} exercise={props.arr[1].exercises2} />
      <Part part={props.arr[2].part3} exercise={props.arr[2].exercises3} />
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const arr = [
    { part1: "Fundamentals of React", exercises1: 10 },
    { part2: "Using props to pass data", exercises2: 7 },
    { part3: "State of a component", exercises3: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content arr={arr} />

      <Total
        exercises1={arr[0].exercises1}
        exercises2={arr[1].exercises2}
        exercises3={arr[2].exercises3}
      />
    </div>
  );
};

export default App;
