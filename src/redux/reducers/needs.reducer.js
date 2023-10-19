
const needs =(state= {}, action) => {
    if (action.type === 'SET_NEEDS') {
        return action.payload
    }
    return state;
}

export default needs;