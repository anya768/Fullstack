import {useDispatch, useSelector} from "react-redux";
import {voteAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = ({id, content}) => {
        dispatch(voteAnecdote(id))
        dispatch({ type: 'notifications/showNotification', payload: `you voted '${content}'` })
        setTimeout( () => dispatch({ type: 'notifications/resetNotification', payload: null }), 5000)
    }

    let anecdotesToDisplay = filter.length > 0
        ? anecdotes.filter( a => a.content.includes(filter) )
        : anecdotes
    anecdotesToDisplay = anecdotesToDisplay.sort( (a,b) => b.votes - a.votes )

    return (
        <div>
            {anecdotesToDisplay
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>Vote</button>
                        </div>
                    </div>
                )}
        </div>
    )


}

export default AnecdoteList