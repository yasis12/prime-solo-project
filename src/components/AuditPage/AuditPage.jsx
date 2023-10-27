import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AuditPage.css'
import axios from 'axios';
import CategorizedSpending from '../CategorizedSpending/CategorizedSpending';


function AuditPage() {
    const history = useHistory();
    // Store
    const budgetTitle = useSelector(store => store.budgetTitle);
    // const budgetID = useSelector(store => store.budgetID)
    const budgetID = 16;
    // States for calculations
    const [budgets, setBudgets] = useState([]);
    const [income, setIncome] = useState([]);
    const [needs, setNeeds] = useState([]);
    const [wants, setWants] = useState([]);
    const [savingDebts, setSavingsDebts] = useState([]);

    // UseEffect
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

      //? CALCULATIONS
      // Total Monthly Income
      const totalMonthlyIncome = (incomeData, selectedBudget) => {
        // Filter income items for the selected budget
        const filteredIncome = incomeData.filter((item) => item.budget_id === selectedBudget);
        // Calculate the total income for the selected budget
        const totalIncome = filteredIncome.reduce((total, item) => total + item.price, 0);
        return totalIncome;
      };
      // Total Needs
      const totalMonthlyNeeds = (needsData, selectedBudget) => {
        // Filter needs items for the selected budget
        const filteredNeeds = needsData.filter((item) => item.budget_id === selectedBudget);
        // Calculate the total income for the selected budget
        const totalNeeds = filteredNeeds.reduce((total, item) => total + item.price, 0);
        return totalNeeds;
      };
      // Total Wants
      const totalMonthlyWants = (wantsData, selectedBudget) => {
        // Filter needs items for the selected budget
        const filteredWants = wantsData.filter((item) => item.budget_id === selectedBudget);
        // Calculate the total income for the selected budget
        const totalWants = filteredWants.reduce((total, item) => total + item.price, 0);
        return totalWants;
      };
      // Total Savings & Debts
      const totalMonthlySavings = (savingsDebtsData, selectedBudget) => {
        const allowedCategories = [
          'emergancyFundContributions',
          'savingsAccountsContributions',
          'workRetirementContributions',
          'individualRetirement',
          'excessLoanPayments',
          'creditCardPayment',
          'studentLoan',
          'other'
        ];
        // Filter needs items for the selected budget
        const filteredSavings = savingsDebtsData.filter((item) => {
          return item.budget_id === selectedBudget && allowedCategories.includes(item.category);
        });
        // Calculate the total income for the selected budget
        const totalSavings = filteredSavings.reduce((total, item) => total + item.price, 0);
        return totalSavings;
      };
      //Total Debt calculation
      const totalDebts = (savingsDebtsData, selectedBudget) => {
        const allowedCategories = [
          'debts'
        ];
        // Filter needs items for the selected budget
        const filteredDebts = savingsDebtsData.filter((item) => {
          return item.budget_id === selectedBudget && allowedCategories.includes(item.category);
        });
        // Calculate the total income for the selected budget
        const totalDebts = filteredDebts.reduce((total, item) => total + item.price, 0);
        return totalDebts;
      };

      //* calculations OUTPUTS
      const monthlyIncome = totalMonthlyIncome(income, budgetID);
      const monthlyNeeds = totalMonthlyNeeds(needs, budgetID);
      const monthlyWants = totalMonthlyWants(wants, budgetID);
      const savingsDebts = totalMonthlySavings(savingDebts, budgetID);
      const debtsTotal = totalDebts(savingDebts, budgetID);

      // Total Monthly Spending
      const totalMonthlySpending = Number(monthlyNeeds) + Number(monthlyWants) + Number(savingsDebts);
      const moneyLeftOver = Number(monthlyIncome) - totalMonthlySpending;
      // const moneyLeftOver = -10;

      // How long to pay of debts (not including interest) if every month was like the one audited
      const howLongToPayOffDebts = () => {
        if (moneyLeftOver < 0) {
          return 'NEVER IN A MILLION';
        } else {
          return (debtsTotal / moneyLeftOver).toFixed(2); // Two decimal places
        }
      }
      
      const timeToPayDebtsDisplay = howLongToPayOffDebts();
      // Percent of monthly income 
      const needsPercent = (monthlyNeeds / monthlyIncome * 100).toFixed(); // Two decimal places
      const wantsPercent = (monthlyWants / monthlyIncome * 100).toFixed(); // Two decimal places
      const savingsDebtsPercent = (savingsDebts / monthlyIncome * 100).toFixed(); // Two decimal places

      //todo: Complete categorized spending component

      //todo: Format the percantages so they are not so long

      const additionalResources = () => {
        history.push('/resources');
      }
    return (
        <>
        <h1>Audit: {budgetTitle}</h1>
        <div className='monthlyIncome'>
            <h3>Monthly Income: ${monthlyIncome}</h3> 
        </div>
        <div className='monthlySpending'>
            <h3>Monthly Spending: ${totalMonthlySpending}</h3> 
        </div>
  
        {/* 50/30/20 section intended to show the user what category they need to focus on when over spending */}
      
        <div className='fiftyThirtyTwenty'>
            <div id='budgetTitle'>
                <h3>How does your spending compare to the recommened 50/30/20 Budget</h3>
            </div>
            <div id='needs'>
                <h4>50 Needs</h4>  
                <h3>Your Percent {needsPercent}%</h3>
                <h4>${monthlyNeeds}</h4> 
            </div>
            <div id='wants'>
                <h4>30 Wants</h4>  
                <h3>Your Percent {wantsPercent}%</h3>
                <h4>${monthlyWants}</h4> 
            </div>
            <div id='savingsDebts'>
                <h4>20 Savings & Debt Payments</h4> 
                <h3>Your Percent {savingsDebtsPercent}%</h3> 
                <h4>${savingsDebts}</h4> 
            </div>
        </div>
        
        {/* <CategorizedSpending />  This is a stretch goal now */}
        
        {/* This section will demonstrate (with out interest) how long it will take to pay off current debts. If there are no current debts it well say congragts */}
        <div className='debtCalculator'>
            <div id='moneyLeftEOM'>
                <h4>Money leftover at the end of the Month</h4>
                <h3>${moneyLeftOver}</h3> {/* placeholder until store is used */}
            </div>
            <div id='totalDebts'>
                <h4>Total Debts</h4>
                <h3>${debtsTotal}</h3> {/* placeholder until store is used */}
            </div>
            <div id='timeToPayDebts'>
                <h4>Given your spending and money left over at the end of the month ( not factoring in interest ) it would take you approximately</h4>
                <h3> {timeToPayDebtsDisplay} YEARS to pay off debts</h3> {/* placeholder until store is used */}
                <h3>To pay of your Debts</h3>
            </div>
        </div>
        
        <button onClick={additionalResources}>Additonal Resources</button>
        </>
    )
}

export default AuditPage;