import {useDispatch} from "react-redux";

const Filter = () => {
    const dispatch = useDispatch()

    const filterHandle = (event) => {
        dispatch({ type: 'filters/filter', payload: event.target.value })
    }

    return (
        <div>
            filter: <input onChange={filterHandle} />
        </div>
    )
}

export default Filter