const Course = ({ course }) => {
  const total = course.parts.reduce((acc, current, index) => {
    console.log("index, sum, current ", index, acc, current.exercises);
    return acc + current.exercises;
  }, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  );
};

const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

export default Course;
