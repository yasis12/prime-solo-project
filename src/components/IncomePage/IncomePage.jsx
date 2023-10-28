import { useState } from 'react';
import './IncomePage.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

function IncomePage() {
    const history = useHistory();
    const dispatch = useDispatch();

    //States
    const [otherIncomeForm, setOtherIncomeForm] = useState([{price:'', description: ''}]);
    const [wagesAfterTax, setWagesAfterTax] = useState({ price: '', description: '' });
    const [budgetTitle, setBudgetTitle] = useState('');
    // Store
    const budgetID = useSelector(store => store.budgetID)

    //Submit BudgetID
    const handleBudgetIDSubmit = (event) => {
        event.preventDefault();
        //Dispatch BudgetID to the redux store
        dispatch({
            type: 'SET_TITLE',
            payload: budgetTitle
        })
        
        // Make axios post request to send BudgetID to the server
        axios.post('/api/budgetID', {budgetTitle})
        .then((response) => {
            const budgetID = response.data.budgetID;
            console.log('BudgetID saved successfully', budgetID);
            // dispatch budgetID to the store
            dispatch({
                type: 'SET_BUDGETID',
                payload: budgetID
            });
        })
        .catch((error) => {
            console.error('Error saving BudgetID to the server', error);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const incomeData = {
            wagesAfterTax,
            otherIncomeForm
        }
        const requestData = {
            incomeData,
            budgetID
        }
        console.log('Post Request Data', requestData);
        axios.post('/api/income', requestData)
        .then((response) => {
            console.log(`Income data submitted successfully`);
        }).catch(error => {
            console.log('Error submitting Income data', error);
        });
    }

    //Functions to handle adding an input filed and storing the data
    const addInputField = () => {
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

    // next page
    const nextPage = () => {
        history.push('/needs')
    }
    //todo: Add Tool tips to each input
    return (
        <>
        <div className='income-page'>
            <div id='income-card'>
                <h1>Income Page</h1>
                {/* Creating the Budget ID here. */}
                <form onSubmit={handleBudgetIDSubmit}>
                    <h3>Name your Audit:</h3>
                    <p>I recommened this be the Month and Year of the inputs you are using</p>
                    <input type="text" placeholder='January 2050' value={budgetTitle} onChange={(event) => setBudgetTitle(event.target.value)} />
                    <button type='submit'>Save BudgetID</button>
                </form>
                <br /><br /><br />
                {/* this is the Income Form: user will enter all income */}
                <h3>INCOME: {budgetTitle}</h3>
                <form onSubmit={handleSubmit}>
                    <div className='wagesAfterTax form-field'>
                        <label>Wages After Tax: </label>
                        <input type="number" placeholder='$' value={wagesAfterTax.price} onChange={(event) => handleWagesAfterTaxChange(event, 'price')} required/>
                        <input type="text" placeholder='Description' value={wagesAfterTax.description} onChange={(event) => handleWagesAfterTaxChange(event, 'description')} />
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
                <button onClick={nextPage}>Next Page</button>
            </div>
            
        </div>
        
        </>
    )
}

export default IncomePage;
