import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {

  return (
    <div>
        <Notification />
        <h1>Anecdotes App</h1>
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
    </div>
  )
}

export default App