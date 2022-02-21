import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.headers}</h1>
    </div>
  )
}

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
    <table>
      <tbody>
      <StatisticLine text="Good:" value={props.good} />
      <StatisticLine text="Neutral:" value={props.neutral} />
      <StatisticLine text="Bad:" value={props.bad} />
      <StatisticLine text="All:" value={props.good+props.neutral+props.bad} />
      <StatisticLine text="Average:" value={(props.good+props.bad*(-1))/(props.good+props.neutral+props.bad)} />
      <StatisticLine text="Positive:" value={(props.good/(props.good+props.neutral+props.bad)*100) + "%"} />
      </tbody>
    </table>
    </div>
  )
}

const StatisticLine = (props) => (
    <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
  )

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  const headers = {
    feedback: 'Give feedback: ',
    statistics: 'Statistics: '
  }

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat('Good'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('Neutral'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('Bad'))
    setBad(bad + 1)
  }

  return (
    <div>
      <Header headers={headers.feedback} />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header headers={headers.statistics} />
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </div>
  )
}

export default App