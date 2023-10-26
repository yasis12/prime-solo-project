import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './AuditPage.css'
import axios from 'axios';
import { number } from 'prop-types';
import CategorizedSpending from '../CategorizedSpending/CategorizedSpending';

function AuditPage() {

    // Store
    const budgetTitle = useSelector(store => store.budgetTitle);
    // const budgetID = useSelector(store => store.budgetID)
    const budgetID = 14;
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

      //! CALCULATIONS
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
      const totalMonthlySavingsDebts = (savingsDebtsData, selectedBudget) => {
        // Filter needs items for the selected budget
        const filteredSavingsDebts = savingsDebtsData.filter((item) => item.budget_id === selectedBudget);
        // Calculate the total income for the selected budget
        const totalSavingsDebts = filteredSavingsDebts.reduce((total, item) => total + item.price, 0);
        return totalSavingsDebts;
      };

      //! calculations OUTPUTS
      const monthlyIncome = totalMonthlyIncome(income, budgetID);
      const monthlyNeeds = totalMonthlyNeeds(needs, budgetID);
      const monthlyWants = totalMonthlyWants(wants, budgetID);
      const savingsDebts = totalMonthlySavingsDebts(savingDebts, budgetID);

      // Total Monthly Spending
      const totalMonthlySpending = Number(monthlyNeeds) + Number(monthlyWants) + Number(savingsDebts);
      // Percent of monthly income 
      const needsPercent = monthlyNeeds / monthlyIncome;
      const wantsPercent = monthlyWants / monthlyIncome;
      const savingsDebtsPercent = savingsDebts / monthlyIncome;
      

      console.log('total monthly income',  totalMonthlyIncome(income, budgetID));
      console.log('total monthly Needs',  totalMonthlyNeeds(needs, budgetID));
      console.log('total monthly Wants',  totalMonthlyWants(wants, budgetID));
      console.log('total monthly Savings & Debts',  totalMonthlyIncome(income, budgetID));

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
                <h3>Your Percent %{needsPercent}</h3>
                <h4>${monthlyNeeds}</h4> 
            </div>
            <div id='wants'>
                <h4>30 Wants</h4>  
                <h3>Your Percent %{wantsPercent}</h3>
                <h4>${monthlyWants}</h4> 
            </div>
            <div id='savingsDebts'>
                <h4>20 Savings & Debt Payments</h4> 
                <h3>Your Percent %{savingsDebtsPercent}</h3> 
                <h4>${savingsDebts}</h4> 
            </div>
        </div>

        {/* <CategorizedSpending />  This is a stretch goal now*/}
        
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