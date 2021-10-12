import {useState} from 'react'

export default function useInputState(initialValue = "") {
    const [state, setState] = useState(initialValue);
    const handleChange = e => {
        setState(e.target.value);
    }
    return (
        [state, handleChange, setState]
    )
}
