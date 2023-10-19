import { useState } from 'react';
import './NeedsPage.css'
import { useHistory } from 'react-router-dom';

function NeedsPage() {
    const history = useHistory();

    //USE STATE
    const [forms, setForms] = useState({
        rentMortgage: [{ price: '', description: '' }],
        rentalHomeInsurance: [{ price: '', description: '' }],
        autoInsurance: [{ price: '', description: '' }],
        propertyTax: [{ price: '', description: '' }],
        healthInsurance: [{ price: '', description: '' }],
        otherInsurance: [{ price: '', description: '' }],
        waterBill: [{ price: '', description: '' }],
        sanitationGarbage: [{ price: '', description: '' }],
        carMaintenance: [{ price: '', description: '' }],
        carPayment: [{ price: '', description: '' }],
        otherTransport: [{ price: '', description: '' }],
        phoneBill: [{ price: '', description: '' }],
        internetBill: [{ price: '', description: '' }],
        groceries: [{ price: '', description: '' }],
        gas: [{ price: '', description: '' }],
        other: [{ price: '', description: '' }]
    })

    // HANDLE + BUTTON CLICK
    const addInputField = (category) => {
        event.preventDefault();
        setForms({
            ...forms,
            [category]: [...forms[category], { price: '', description: '' }],
        });
    };

    //HANDLE INPUT FIELD CHANGE
    const handleInputChange = (event, category, index) => {
        const {name, value} = event.target;
        const updatedForms = { ...forms };
        updatedForms[category][index][name] = value;
        setForms(updatedForms);
    }

    //HANDLE FORM SUBMIT
    const handleSubmit = () => {
        history.push('/wants')
    }

    return (
        <>
        <h1>Needs Page</h1>
        <form onSubmit={handleSubmit}>
        {/* START FORM */}
            {/* Dining Out */}
        {['rentMortgage','rentalHomeInsurance','autoInsurance','propertyTax','healthInsurance','otherInsurance',
        'waterBill','sanitationGarbage','carMaintenance', 'carPayment', 'otherTransport', 'phoneBill', 'internetBill', 
        'groceries', 'gas', 'other'].map((category) => (
            <div className={category} key={category}>
                <label>
                    {category === 'rentMortgage' ? 'Rent / Mortgage' : 
                        category === 'rentalHomeInsurance' ? 'Rental Home Insurance' : 
                        category === 'autoInsurance' ? 'Auto Insurance' :
                        category === 'propertyTax' ? 'Property Tax' :
                        category === 'healthInsurance' ? 'Health Insurance' :
                        category === 'otherInsurance' ? 'Other Insurance' :
                        category === 'waterBill' ? 'Water Bill' :
                        category === 'sanitationGarbage' ? 'Sanitation Garbage' :
                        category === 'carMaintenance' ? 'Car Maintenance' :
                        category === 'carPayment' ? 'Car Payment' :
                        category === 'otherTransport' ? 'Other Transport' :
                        category === 'phoneBill' ? 'Phone Bill' :
                        category === 'internetBill' ? 'Internet Bill' :
                        category === 'groceries' ? 'Groceries' :
                        category === 'gas' ? 'Gas' :
                        'Other Needs'}:
                </label>
                {forms[category].map((value, i) => (
                    <div key={i}>
                        <input 
                        type = "number"
                        placeholder='$'
                        name = "price"
                        value ={value.price}
                        onChange={(event) => handleInputChange(event, category, i)}
                        />
                        <input 
                        type = "text"
                        name = "description"
                        placeholder='Description'
                        value ={value.price}
                        onChange={(event) => handleInputChange(event, category, i)}
                        />
                        <button onClick={() => addInputField(category)}>+</button>
                    </div>
                ))}
            </div>
        ))}
        <button type='submit'>NEXT PAGE</button>
        {/* END FORM */}
        </form>
        
        </>
       
    )
}

export default NeedsPage;