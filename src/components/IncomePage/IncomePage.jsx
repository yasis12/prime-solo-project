import { useState, useEffect } from 'react';
import './IncomePage.css'
import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';

function IncomePage() {
    const history = useHistory();
    const dispatch = useDispatch();

    //States
    const [otherIncomeForm, setOtherIncomeForm] = useState([{price:'', description: ''}]);
    const [wagesAfterTax, setWagesAfterTax] = useState({ price: '', description: '' });
    const [budgetID, setBudgetID] = useState('');

    //Submit BudgetID
    const handleBudgetIDSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SET_BUDGETID',
            payload: budgetID
        })
    };
    //Submit income Form
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SET_INCOME',
            payload: {otherIncomeForm, wagesAfterTax}
        })
        history.push('/needs');
    }
    //Functions to handle adding an input filed and storing the data
    const addInputField = () => {
        event.preventDefault();
        setOtherIncomeForm([...otherIncomeForm, { price: '', description: '' }]);
        console.log('Input Field being added');
    }
    const handleOtherIncomeChange = (event, i) => {
        const { name, value } = event.target
        const updatedFields = [...otherIncomeForm];
        updatedFields[i][name] = value;
        setOtherIncomeForm(updatedFields);
    }
      const handleWagesAfterTaxChange = (event, name) => {
        const value = event.target.value;
        setWagesAfterTax({ ...wagesAfterTax, [name]: value });
    }
    
    return (
        <>
        <h1>Income Page</h1>
        {/* Creating the Budget ID here. */}
        <form onSubmit={handleBudgetIDSubmit}>
            <h3>Name your Audit:</h3>
            <p>I recommened this te be the Month and Year of the inputs you are using</p>
            <input type="text" placeholder='January 2050' value={budgetID} onChange={(event) => setBudgetID(event.target.value)} />
            <button type='submit'>Save BudgetID</button>
        </form>
        {/* this is the Income Form: user will enter all income */}
         <form onSubmit={handleSubmit}>
            <div className='wagesAfterTax form-field'>
                <label>Wages After Tax: </label>
                <input type="number" placeholder='$' value={wagesAfterTax.price} onChange={(event) => handleWagesAfterTaxChange(event, 'price')} required/>
                <input type="text" placeholder='Description' value={wagesAfterTax.description} onChange={(event) => handleWagesAfterTaxChange(event, 'decription')}/>
            </div>
            <div className='otherIncome form-field'>
            <label>Other Income: </label>
                {otherIncomeForm.map((value, i) => (
                    <div key={i}>
                        <input type="number" name='price' placeholder='$' value={value.price} onChange={(event) => handleOtherIncomeChange(event, i)}/>
                        <input type="text" placeholder='Description' name="description" value={value.description} onChange={(event) => handleOtherIncomeChange(event, i)}/>
                        <button onClick={addInputField}> + </button>
                    </div>
                ))}
            </div>
            <button type='submit'>Submit Income</button>
        </form>
        </>
    )
}

export default IncomePage;
