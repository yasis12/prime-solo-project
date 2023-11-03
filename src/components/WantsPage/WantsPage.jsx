import './WantsPage.css'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// MUI
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function WantsPage() {
    const history = useHistory();
    const budgetTitle = useSelector(store => store.budgetTitle);
    const budgetID = useSelector(store => store.budgetID)

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
    //! MUI State
    const [wantsAlert, setWantsAlert] = useState(false);

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
            setWantsAlert(true);
        }).catch(error => {
            console.log('Error submitting wants data', error);
        });
    }
    //! MUI handle close
    const handleCloseWants = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setWantsAlert(false);
      };

      const wantsAction = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="secondary"
            onClick={handleCloseWants}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    const nextPage = () => {
        history.push('/savingsdebts')
    }

    //todo: Add Tool tips to each input
    //todo: style buttons on this page
    return (
        <>
        <div className='wants-page'>
            <div id='wants-card'>
                    <h1>Wants: {budgetTitle}</h1>
                <form onSubmit={handleSubmit}>
                {/* START FORM */}
                    {/* Dining Out */}
                {['diningOut','clothingJewlery','drugs','moviesEvents','memberships','travel','subscriptions','homeDecor','other'].map((category) => (
                    <div className={category} key={category}>
                        <label>
                            {category === 'diningOut' ? 'Dining Out' : 
                                category === 'clothingJewlery' ? 'Clothing & Jewlery' : 
                                category === 'drugs' ? 'Recreational Use Items' :
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
                <Snackbar
                    open={wantsAlert}
                    autoHideDuration={4000}
                    onClose={handleCloseWants}
                    Action={wantsAction}
                    message='Wants have been submitted! Navigate to the next page.'
                />
                {/* END FORM */}
                </form>
                <button onClick={nextPage}>Next Page</button>
            </div>
        </div>
        </>
       
    )
}

export default WantsPage;