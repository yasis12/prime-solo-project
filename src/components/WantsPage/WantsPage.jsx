import './WantsPage.css'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function WantsPage() {
    const history = useHistory();
    const budgetTitle = useSelector(store => store.budgetTitle);

    //USE STATE
    const [forms, setForms] = useState({
        diningOut: [{ price: '', description: '' }],
        clothingJewlery: [{ price: '', description: '' }],
        drugs: [{ price: '', description: '' }],
        moviesEvents: [{ price: '', description: '' }],
        memberships: [{ price: '', description: '' }],
        travel: [{ price: '', description: '' }],
        subscriptions: [{ price: '', description: '' }],
        homeDecor: [{ price: '', description: '' }],
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
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestData = {
            forms,
            budgetID
        }
        console.log('Wants Post Request Data:', requestData);
        axios.post('/api/wants', requestData)
        .then((response) => {
            console.log(`Wants data submitted successfully`);
        }).catch(error => {
            console.log('Error submitting wants data', error);
        });

    }

    const nextPage = () => {
        history.push('/savingsdebts')
    }

    return (
        <>
        <h1>Wants: {budgetTitle}</h1>
        <form onSubmit={handleSubmit}>
        {/* START FORM */}
            {/* Dining Out */}
        {['diningOut','clothingJewlery','drugs','moviesEvents','memberships','travel','subscriptions','homeDecor','other'].map((category) => (
            <div className={category} key={category}>
                <label>
                    {category === 'diningOut' ? 'Dining Out' : 
                        category === 'clothingJewlery' ? 'Clothing & Jewlery' : 
                        category === 'drugs' ? 'Drugs (Alcohol, THC)' :
                        category === 'moviesEvents' ? 'Movies & Events' :
                        category === 'memberships' ? 'Memberships' :
                        category === 'travel' ? 'Travel' :
                        category === 'subscriptions' ? 'Subscriptions' :
                        category === 'homeDecor' ? 'Home Decor Items' :
                        'Other Wants'}:
                </label>
                {forms[category].map((value, i) => (
                    <div key={i}>
                        <input 
                        type = "number"
                        name = "price"
                        placeholder="$"
                        value ={value.price}
                        onChange={(event) => handleInputChange(event, category, i)}
                        />
                        <input 
                        type = "text"
                        name = "description"
                        placeholder='Description'
                        value ={value.description}
                        onChange={(event) => handleInputChange(event, category, i)}
                        />
                        <button onClick={() => addInputField(category)}>+</button>
                    </div>
                ))}
            </div>
        ))}
        <button type='submit'>Save Wants</button>
        {/* END FORM */}
        </form>
        <button onClick={nextPage}>Next Page</button>
        </>
       
    )
}

export default WantsPage;