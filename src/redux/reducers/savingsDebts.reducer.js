const savingsDebts =(state= {}, action) => {
    if (action.type === 'SET_SAVINGSDEBTS') {
        return action.payload
    }
    return state;
}

export default savingsDebts;