import './SavingsDebtsPage.css'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch} from 'react-redux';

function SavingsDebtsPage() {
    const history = useHistory();
    const dispatch = useDispatch();

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
        dispatch({
            type: 'SET_SAVINGSDEBTS',
            payload: forms
        })
        history.push('/audit')
    }

    
    return (
        <>
        <h1>Savings & Debts</h1>
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
        <button type='submit'>NEXT PAGE</button>
        {/* END FORM */}
        </form>
        
        </>
    )
}

export default SavingsDebtsPage;