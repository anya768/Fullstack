import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.headers}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  const headers = {
    anecdote: 'Anecdote of the Day: ',
    statistics: 'Anecdote with the most votes: '
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0)
  const [topAnecdoteIndex, setTopAnecdoteIndex] = useState(0)

  const handleSelectedClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleVotesClick = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
    setTopAnecdoteIndex(newVotes.indexOf(Math.max.apply(null, newVotes)))
  }
  return (
    <div>
      <Header headers={headers.anecdote} />
      <p>{anecdotes[selected]}</p>
      <p> This anecdote has {votes[selected]} votes</p>
      <Button handleClick={handleSelectedClick} text='Next anecdote =>' />
      <Button handleClick={handleVotesClick} text='Vote' />
      <Header headers={headers.statistics} />
      <p>{anecdotes[topAnecdoteIndex]}</p>
      <p> This anecdote has {votes[topAnecdoteIndex]} votes</p>
    </div>
  )
}

export default App