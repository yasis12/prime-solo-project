import { useState } from 'react';
import './NeedsPage.css'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
// MUI
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function NeedsPage() {
    const history = useHistory();
    const budgetTitle = useSelector(store => store.budgetTitle);
    const budgetID = useSelector(store => store.budgetID);

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
    //! MUI State
    const [needsAlert, setNeedsAlert] = useState(false);


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
        console.log('Needs Post Request Data:', requestData);
        axios.post('/api/needs', requestData)
        .then((response) => {
            console.log(`Needs data submitted successfully`);
            setNeedsAlert(true);
        }).catch(error => {
            console.log('Error submitting needs data', error);
        });
    }

    //! MUI handle close
    const handleCloseNeeds = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setNeedsAlert(false);
      };

      const needsAction = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="secondary"
            onClick={handleCloseNeeds}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    // Next Page
    const nextPage = () => {
        history.push('/wants')
    }

    return (
        <>
        <div className='needs-page'>
            <div id='needs-card'>
                <h1>Needs: {budgetTitle}</h1>
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
                                value ={value.description}
                                onChange={(event) => handleInputChange(event, category, i)}
                                />
                                <button onClick={() => addInputField(category)}>+</button>
                            </div>
                        ))}
                    </div>
                ))}
                <button type='submit'>Save Needs</button>
                <Snackbar
                    open={needsAlert}
                    autoHideDuration={4000}
                    onClose={handleCloseNeeds}
                    Action={needsAction}
                    message='Needs have been submitted! Navigate to the next page.'
                />
                
                </form>
               
                <button onClick={nextPage}>Next Page</button>
            </div>
        </div>
       
        </>
       
    )
}

export default NeedsPage;