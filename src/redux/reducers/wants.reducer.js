
const wants =(state= {}, action) => {
    if (action.type === 'SET_WANTS') {
        return action.payload
    }
    return state;
}

export default wants;