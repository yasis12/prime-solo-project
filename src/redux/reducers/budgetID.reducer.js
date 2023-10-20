
const budgetID =(state= [], action) => {
    if (action.type === 'SET_BUDGETID') {
        return action.payload
    }
    return state;
}

export default budgetID;