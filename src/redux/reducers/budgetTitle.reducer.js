
const budgetTitle =(state= [], action) => {
    if (action.type === 'SET_TITLE') {
        return action.payload
    }
    return state;
}

export default budgetTitle;