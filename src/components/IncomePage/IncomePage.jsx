import { useState } from 'react';
import './IncomePage.css'
import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';

function IncomePage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [otherIncomeForm, setOtherIncomeForm] = useState([{price:'', description: ''}]);
    const [wagesAfterTax, setWagesAfterTax] = useState([{price:'', description: ''}]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SET_INCOME',
            payload: otherIncomeForm, wagesAfterTax
        })
        history.push('/needs');
    }

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

      const handleWagesAfterTaxChange = (event) => {
        const { name, value } = event.target;
        setWagesAfterTax({ ...wagesAfterTax, [name]: value });
    }
    
    return (
        <>
        <h1>Income Page</h1>
         <form onSubmit={handleSubmit}>
            <div className='wagesAfterTax form-field'>
                <label>Wages After Tax: </label>
                <input type="number" placeholder='$' value={wagesAfterTax.price} onChange={handleWagesAfterTaxChange}/>
                <input type="text" placeholder='Description' value={wagesAfterTax.description} onChange={handleWagesAfterTaxChange}/>
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
            <button type='submit'>NEXT PAGE</button>
        </form>
        </>
    )
}

export default IncomePage;
