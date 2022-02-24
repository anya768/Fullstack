import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
            <Part key={part.id} part={part.name} exercises={part.exercises} />
          )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    let sumExercises = parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises,
    0)
    return (
      <div>
        <b><p>Number of exercises {sumExercises}</p></b>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
      </div>
    )
  }

export default Course