import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './AuditPage.css'
import axios from 'axios';
import logger from 'redux-logger';

function AuditPage() {

    const budgetTitle = useSelector(store => store.budgetTitle);
    const [budgets, setBudgets] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [income, setIncome] = useState('');
    const [needs, setNeeds] = useState('');
    const [wants, setWants] = useState('');
    const [savingDebts, setSavingsDebts] = useState('');

    // Use Effect
    useEffect(() => {
        fetchBudgets();
        fetchIncome();
        fetchNeeds();
        fetchSavingsDebts();
        fetchWants();
      }, []);
    
    
      //Budget Get Request
      const fetchBudgets = () => {
        axios.get('/api/budgetID').then((response) => {
          console.log('Fetched Budgets', response.data);
            setBudgets(response.data);
        // Set the default budget, e.g., the first budget from the list
        if (response.data.length > 0) {
          setSelectedBudget(response.data[0].id);
        }
        }).catch((error) => {
          console.log('error fetching budgets', error);
          alert('Something went wrong.');
        });
      }
      //income get request
      const fetchIncome = () => {
        axios.get('/api/income').then((response) => {
          console.log('income data:', response.data);
            setIncome(response.data);   
        }).catch((error) => {
          console.log('error fetching Income', error);
          alert('Something went wrong.');
        });
      }
      //Needs Get request
      const fetchNeeds = () => {
        axios.get('/api/needs').then((response) => {
          console.log('needs data:', response.data);
            setNeeds(response.data);
        }).catch((error) => {
          console.log('error fetching Needs', error);
          alert('Something went wrong.');
        });
      }
      //Wants Get request
      const fetchWants = () => {
        axios.get('/api/wants').then((response) => {
          console.log('Wants data:', response.data);
            setWants(response.data);
        }).catch((error) => {
          console.log('error fetching Wants', error);
          alert('Something went wrong.');
        });
      }
      //Savings and debts get request
      const fetchSavingsDebts = () => {
        axios.get('/api/savingsdebts').then((response) => {
          console.log('Savings & Debts data:', response.data);
            setSavingsDebts(response.data);
        }).catch((error) => {
          console.log('error fetching savings & Debts', error);
          alert('Something went wrong.');
        });
      }

   

      // Total Monthly Income
      const totalMonthlyIncome = (incomeData, selectedBudget) => {
        if (!Array.isArray(incomeData)) {
          return 0; // Return a default value or handle the error accordingly
        }
        // Filter income items for the selected budget
        const filteredIncome = incomeData.filter((item) => item.budget_id === selectedBudget);

        // Calculate the total income for the selected budget
        const totalIncome = filteredIncome.reduce((total, item) => total + item.price, 0);

        return totalIncome;
      };
      // Total Needs

      // Total Wants

      // Total Savings & Debts

      // Total Monthly Spending
      const handleBudgetSelect = (budgetId) => {
        setSelectedBudget(budgetId);
      };

      console.log('Income',income);
      console.log('Budget ID', selectedBudget);
      console.log('Total Monthly Income', totalMonthlyIncome(income,selectedBudget));

    return (
        <>
            <select onChange={(event) => handleBudgetSelect(event.target.value)}>
                {budgets.map((budget) => (
                    <option key={budget.id} value={budget.id}>
                        {budget.budgetTitle}
                    </option>
                ))}
             </select>


             <button onClick={totalMonthlyIncome(income,selectedBudget)}>Hello</button>

             <h3>TEST VALUE: ${}</h3>


          <p>end test</p>  
        <h1>Audit: {budgetTitle}</h1>
        <div className='monthlyIncome'>
            {/* <h3>Monthly Income: ${}</h3> the 2000 is a placeholder until store is created  */}
        </div>
        <div className='monthlySpending'>
            <h3>Monthly Spending: $2000{}</h3> {/* the 2000 is a placeholder until store is created */}
        </div>
  
        50/30/20 section intended to show the user what category they need to focus on when over spending
      
        <div className='fiftyThirtyTwenty'>
            <div id='budgetTitle'>
                <h3>How does your spending compare to the recommened 50/30/20 Budget</h3>
            </div>
            <div id='needs'>
                <h4>{}50 Needs</h4>  {/* Stretch feature add the ability to change the 50 to what ever you want */}
                <h4>$1000{}</h4> {/* the 1000 is a placeholder until store is created */}
            </div>
            <div id='wants'>
                <h4>{}30 Wants</h4>  {/* Stretch feature add the ability to change the 50 to what ever you want */}
                <h4>$1000{}</h4> {/* the 1000 is a placeholder until store is created */}
            </div>
            <div id='savingsDebts'>
                <h4>{}20 Savings & Debt Payments</h4>  {/* Stretch feature add the ability to change the 50 to what ever you want */}
                <h4>$500{}</h4> {/* the 500 is a placeholder until store is created */}
            </div>
        </div>

        {/* 
        This section is inteneded to help the user see what category they are spending the most money on and how it compares to their othe expenses
        */}
        <div className='categorizedSpending'>
            <div id='categorySpendingTitle'>
                <h3>What category are you over spending in?</h3>
            </div>
            <div>
                {/* I will create a new component that has the functionality that I desire here but for now I will add the below code as a place holder so I can see what it will look like*/}
                <h5>rent utilities: &nbsp;&nbsp;&nbsp;&nbsp;  $500  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  %20 </h5>
                <h5>gas: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  $500  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  %20 </h5>
                <h5>Groceries: &nbsp;&nbsp;&nbsp;&nbsp;  $500  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  %20 </h5>
                <h5>shopping: &nbsp;&nbsp;&nbsp;&nbsp;  $500  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  %20 </h5>
                <h5>dining out: &nbsp;&nbsp;&nbsp;&nbsp;  $500  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  %20 </h5>
                <h5>fun: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  $500  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  %20 </h5>
                <h5>Household Misc: &nbsp;&nbsp;&nbsp;&nbsp;  $500  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  %20 </h5>
            </div>
        </div>

        {/* This section will demonstrate (with out interest) how long it will take to pay off current debts. If there are no current debts it well say congragts */}
        <div className='debtCalculator'>
            <div id='moneyLeftEOM'>
                <h4>Money leftover at the end of the Month</h4>
                <h3>{}$100</h3> {/* placeholder until store is used */}
            </div>
            <div id='totalDebts'>
                <h4>Total Debts</h4>
                <h3>{}$10000</h3> {/* placeholder until store is used */}
            </div>
            <div id='timeToPayDebts'>
                <h4>Given your spending and money left over at the end of the month ( not factoring in interest ) it would take you approximately</h4>
                <h3> {}100 YEARS</h3> {/* placeholder until store is used */}
                <h3>To pay of your Debts</h3>
            </div>
        </div>
        
        </>
    )
}

export default AuditPage;