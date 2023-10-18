

const income =(state= { otherIncomeForm: [], wagesAfterTax: [] }, action) => {
    if (action.type === 'SET_INCOME') {
        return {
            ...state,
            otherIncomeForm: action.payload.otherIncomeForm,
            wagesAfterTax: action.payload.wagesAfterTax,
        };
    }
    return state;
}

export default income;