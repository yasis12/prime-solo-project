import './SavingsDebtsPage.css'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// MUI
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function SavingsDebtsPage() {
    const history = useHistory();
    const budgetTitle = useSelector(store => store.budgetTitle);
    const budgetID = useSelector(store => store.budgetID)


    //USE STATE
    const [forms, setForms] = useState({
        emergancyFundContributions: [{ price: '', description: '' }],
        savingsAccountsContributions: [{ price: '', description: '' }],
        workRetirementContributions: [{ price: '', description: '' }],
        individualRetirement: [{ price: '', description: '' }],
        excessLoanPayments: [{ price: '', description: '' }],
        creditCardPayment: [{ price: '', description: '' }],
        studentLoan: [{ price: '', description: '' }],
        other: [{ price: '', description: '' }],
        debts: [{ price: '', description: '' }]
    })
    //! MUI State
    const [savingsDebtsAlert, setSavingsDebtsAlert] = useState(false);

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
        console.log('Savings & Debts Post Request Data:', requestData);
        axios.post('/api/savingsdebts', requestData)
        .then((response) => {
            console.log(`Savings & Debts data submitted successfully`);
            setSavingsDebtsAlert(true);
        }).catch(error => {
            console.log('Error submitting Savings & Debts data', error);
        });
    }

     //! MUI handle close
     const handleCloseSavingsDebts = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setWantsAlert(false);
      };

      const savingsDebtsAction = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="secondary"
            onClick={handleCloseSavingsDebts}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
      
    const nextPage = () => {
        history.push('/audit')
    }

    //todo: Add Tool tips to each input
        //todo: style buttons on this page

    return (
        <>

        <div className='savingsDebts-page'>
            <div id='savingsDebts-card'>
                    <h1>Savings & Debts: {budgetTitle}</h1>
                <form onSubmit={handleSubmit}>
                {/* START FORM */}
                    {/* Dining Out */}
                {['emergancyFundContributions','savingsAccountsContributions','workRetirementContributions','individualRetirement','excessLoanPayments','creditCardPayment','studentLoan','other','debts'].map((category) => (
                    <div className={category} key={category}>
                        <label>
                            {category === 'emergancyFundContributions' ? 'Emergancy Fund Contributions' : 
                                category === 'savingsAccountsContributions' ? 'Savings Account Contributions' : 
                                category === 'workRetirementContributions' ? '401k Contributions' :
                                category === 'individualRetirement' ? 'Individual Retirement Account Contributions' :
                                category === 'excessLoanPayments' ? 'Excess Loan Payments' :
                                category === 'creditCardPayment' ? 'Credit Card Minimum Monthly Payments' :
                                category === 'studentLoan' ? 'Student Loan Minimum Monthly Payments' :
                                category === 'other' ? 'Other Savings' :
                                'Debts'}:
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
                <button type='submit'>Submit Savings & Debts</button>
                <Snackbar
                    open={savingsDebtsAlert}
                    autoHideDuration={4000}
                    onClose={handleCloseSavingsDebts}
                    Action={savingsDebtsAction}
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

export default SavingsDebtsPage;