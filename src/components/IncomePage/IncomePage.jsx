import { useState } from 'react';
import './IncomePage.css'
import { useHistory } from 'react-router-dom';

function IncomePage() {
    const history = useHistory();

    const [otherIncomeForm, setOtherIncomeForm] = useState([]);

    const handleSubmit = () => {
        history.push('/needs');
    }

    const addInputField = () => {
        setOtherIncomeForm([...otherIncomeForm, { price: '', description: '' }]);
    }

    const handleOtherIncomeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...otherIncomeForm];
        updatedFields[index][name] = value;
        setOtherIncomeForm(updatedFields);
    }
    
    return (
        <>
     <h1>Income Page</h1>
        <form onSubmit={handleSubmit}>
            <div className='wagesAfterTax form-field'>
                <label>Wages After Tax: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
            <div className='otherIncome form-field'>
            <label>Other Income: </label>
                {otherIncomeForm.map((field, index) => (
                    <div key={index}>
                        <input type="number" name='price' value={field.price} onChange={(event) => handleOtherIncomeChange(index, event)}/>
                        <input type="text" placeholder='Description' name="description" value={field.description} onChange={(event) => handleOtherIncomeChange(index, event)}/>
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
