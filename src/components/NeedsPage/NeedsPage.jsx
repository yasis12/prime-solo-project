import { useState } from 'react';
import './NeedsPage.css'
import { useHistory } from 'react-router-dom';

function NeedsPage() {
    const history = useHistory();

    const [groceriesForm, setGroceriesForm] = useState([{price: '', description: ''}]);
    const [gasForm, setGasForm] = useState([{price: '', description: ''}]);
    const [otherNeedsForm, setOtherNeedsForm] = useState([{price: '', description: ''}]);

    // HANDLE + BUTTON CLICK
    const addGroceryInputField = () => {
        event.preventDefault();
        setGroceriesForm([...groceriesForm, {price: '', description: ''}]);
    }

    const addGasInputField = () => {
        event.preventDefault();
        setGasForm([...gasForm, {price: '', description: ''}]);
    }

    const addOtherNeedsField = () => {
        event.preventDefault();
        setOtherNeedsForm([...otherNeedsForm, { price: '', description: '' }]);
    }

    // HANDLE INPUT FIELD CHANGE
    const handleGroceryChange = (event, i) => {
        const { name, value } = event.target
        const updatedFields = [...groceriesForm];
        updatedFields[i][name] = value;
        setGroceriesForm(updatedFields);
    }

    const handleGasChange = (event, i) => {
        const { name, value } = event.target
        const updatedFields = [...gasForm];
        updatedFields[i][name] = value;
        setGasForm(updatedFields);
    }

    const handleOtherNeedsChange = (event, i) => {
        const { name, value } = event.target
        const updatedFields = [...otherNeedsForm];
        updatedFields[i][name] = value;
        setOtherNeedsForm(updatedFields);
    }

    // On Submit of form route to next page ( for now )
    const handleSubmit = () => {
        history.push('/wants')
    }

    return (
        <>
         <h1>Needs Page</h1>
         <form onSubmit={handleSubmit}> 
         {/* START OF FORM */}
            {/* Rent/Mortgage */}
            <div className='rentMortgage'>
                <label>Rent | Mortgage: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
            {/* Retal / Home insurance */}
            <div className='rentHomeInsurance'>
                <label>Rental Home Insurance: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Auto Insurance */}
             <div className='autoInsurance'>
                <label>Auto Insurance: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Property Tax */}
             <div className='propertyTax'>
                <label>Property Tax: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Health Insurance */}
             <div className='healthInsurance'>
                <label>Health Insurance: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Other Insurance / Medical Costs */}
             <div className='otherInsurance'>
                <label>Other Insurance / Medical Costs: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Water Bill */}
             <div className='waterBill'>
                <label>Water Bill: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Sanitation Garbage */}
             <div className='sanitationGarbage'>
                <label>Sanitation Garbage: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Car Maintenance & Repairs */}
             <div className='carMaintenanceRepairs'>
                <label>Car Maintenance & Repairs: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Car Payment */}
             <div className='carPayment'>
                <label>Car Payment: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Other Transport */}
             <div className='otherTransport'>
                <label>Other Transport: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Phone Bill */}
             <div className='phoneBill'>
                <label>Phone Bill: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Internet Bill */}
             <div className='internetBill'>
                <label>Internet Bill: </label>
                <input type="number" />
                <input type="text" placeholder='Description' />
            </div>
             {/* Groceries */}
             <div className='groceries'>
            <label>Groceries: </label>
                {groceriesForm.map((value, i) => (
                    <div key={i}>
                        <input type="number" name='price' value={value.price} onChange={(event) => handleGroceryChange(event, i)}/>
                        <input type="text" placeholder='Description' name="description" value={value.description} onChange={(event) => handleGroceryChange(event, i)}/>
                        <button onClick={addGroceryInputField}> + </button>
                    </div>
                ))}
            </div>
             {/* Gas */}
             <div className='gas'>
            <label>Gas: </label>
                {gasForm.map((value, i) => (
                    <div key={i}>
                        <input type="number" name='price' value={value.price} onChange={(event) => handleGasChange(event, i)}/>
                        <input type="text" placeholder='Description' name="description" value={value.description} onChange={(event) => handleGasChange(event, i)}/>
                        <button onClick={addGasInputField}> + </button>
                    </div>
                ))}
            </div>
             {/* Other Required like pets? */}
             <div className='otherNeeds'>
            <label>Other Needs: </label>
                {otherNeedsForm.map((value, i) => (
                    <div key={i}>
                        <input type="number" name='price' value={value.price} onChange={(event) => handleOtherNeedsChange(event, i)}/>
                        <input type="text" placeholder='Description' name="description" value={value.description} onChange={(event) => handleOtherNeedsChange(event, i)}/>
                        <button onClick={addOtherNeedsField}> + </button>
                    </div>
                ))}
            </div>

            {/* END OF FORM */}
            <button type='submit'>NEXT PAGE</button>
        </form>

        </>
       

    )
}

export default NeedsPage;