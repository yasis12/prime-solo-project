import { useState, useEffect } from 'react';
import axios from 'axios';
import './CategorizedSpending.css'
import { useSelector } from 'react-redux';

function CategorizedSpending() {

    const budgetID = useSelector(store => store.budgetID);
    // const budgetID = 17;
    const [income, setIncome] = useState([]);
    const [needs, setNeeds] = useState([]);
    const [wants, setWants] = useState([]);
    const [savingDebts, setSavingsDebts] = useState([]);

   
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

      useEffect(() => {
        fetchIncome();
        fetchNeeds();
        fetchSavingsDebts();
        fetchWants();
      }, []);

      const totalMonthlyIncome = (incomeData, selectedBudget) => {
        // Filter income items for the selected budget
        const filteredIncome = incomeData.filter((item) => item.budget_id === selectedBudget);
        // Calculate the total income for the selected budget
        const totalIncome = filteredIncome.reduce((total, item) => total + item.price, 0);
        return totalIncome;
      };

      const totalIncome = totalMonthlyIncome(income, budgetID)

      // needs totals
      const needsTotals = needs.filter(item => item.budget_id === budgetID)
      .reduce((totals, item) => {
        const { category, price } = item;
        if (!totals[category]) {
          totals[category] = 0;
        }
        totals[category] += price;
        return totals;
      }, {});
      // Savings & Debts totals
      const allowedSavingsDebtsCategories = [
        'emergancyFundContributions',
        'savingsAccountsContributions',
        'workRetirementContributions',
        'individualRetirement',
        'excessLoanPayments',
        'creditCardPayment',
        'studentLoan',
        'other'
      ];
      const savingDebtsTotals = savingDebts
        .filter((item) => item.budget_id === budgetID && allowedSavingsDebtsCategories.includes(item.category))
        .reduce((totals, item) => {
          const { category, price } = item;
          if (!totals[category]) {
            totals[category] = 0;
          }
          totals[category] += price;
          return totals;
        }, {});
      // Wants Totals    
      const wantsTotals = wants.filter(item => item.budget_id === budgetID)
      .reduce((totals, item) => {
        const { category, price } = item;
        if (!totals[category]) {
          totals[category] = 0;
        }
        totals[category] += price;
        return totals;
      }, {});

      const combinedObject = {...needsTotals, ...wantsTotals, ...savingDebtsTotals}

      const sortedCombinedObject = Object.fromEntries(
        Object.entries(combinedObject).sort(([, a], [, b]) => b - a)
      );
      
      const calculatePercentOfIncome = (price) => {
        return ((price / totalIncome) * 100).toFixed(2);
      };

    return (
        <>
        <div id="categorized-spending-card">
          <h3>What category are you overspending in?</h3>
          <div className="category-card">
            {Object.entries(sortedCombinedObject).map(([category, price]) => (
              <div key={category} className="category-entry">
                <h5>{category}:</h5>
                <h5>Price: ${price.toFixed(2)}</h5>
                <h5>Percent of Income: {calculatePercentOfIncome(price)}%</h5>
              </div>
            ))}
          </div>
        </div>
      </>
    )
}

export default CategorizedSpending;