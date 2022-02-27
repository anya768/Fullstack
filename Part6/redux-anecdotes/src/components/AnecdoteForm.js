import { useState } from "react";
import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')

    const createHandler = (event) => {
        event.preventDefault()
        setContent('')
        dispatch(createAnecdote(content))
        dispatch({ type: 'notifications/showNotification', payload: `you created '${content}'` })
        setTimeout( () => dispatch({ type: 'notifications/resetNotification', payload: null }), 5000)
    }

    return (
        <div>
            <h2>Create New Anecdote</h2>
            <form onSubmit={createHandler}>
                <div><input value={content} onChange={event=>setContent(event.target.value)}/></div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm