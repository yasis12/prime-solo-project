import './BudgetComments.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

function BudgetComments() {

    const [budgets, setBudgets] = useState([]);

    const fetchBudgets = () => {
        axios.get('/api/budgetID/all').then((response) => {
          console.log('Fetched Budgets', response.data);
            setBudgets(response.data);
        }).catch((error) => {
          console.log('error fetching budgets', error);
          alert('Something went wrong.');
        });
      }

      useEffect(() => {
        fetchBudgets();
      }, []);
    
    const handleSubmit = () => {

    };

    return (
        <>
        <h1>Comment any budget insights you have here!</h1>
        <ul>
            {budgets.map((budget) => (
               <li key={budget.id} value={budget.id}>
               {budget.budgetTitle}
               <br />
               <form onSubmit={handleSubmit}>
                <input type="text" />
               </form>
           </li> 
            ))}
            
        </ul>
        </>
    )
}

export default BudgetComments;