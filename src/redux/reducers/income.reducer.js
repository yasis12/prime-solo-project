

const incomeReducer =(state= [], action) => {
    if (action.type === 'SET_INCOME') {
        return action.payload
    }
    return state;
}

export default incomeReducer;