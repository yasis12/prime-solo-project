import { useState } from 'react';
import { useSelector } from 'react-redux';
import './AuditPage.css'

function AuditPage() {

    const budgetTitle = useSelector(store => store.budgetTitle);

    
    // // Total Income data handling
    // const calulateTotalIncome = () => {
    //     let totalIncome = 0;
    //     // using parseFloat to ensure the data is a number
    //     const wagesAfterTaxPrice = parseFloat(incomeArray.wagesAfterTax.price);
    //     totalIncome += wagesAfterTaxPrice;
    //     //looping through the other income form to add all the incomes
    //     for (let i=0; i < incomeArray.otherIncomeForm.length; i++) {
    //         const price = parseFloat(incomeArray.otherIncomeForm[i].price);
    //         totalIncome += isNaN(price) ? 0 : price;
    //     }
    //     // This is all price inputs from income page 
    //     return totalIncome;
    // };

    // const totalIncome = calulateTotalIncome();
    // console.log('total Income', totalIncome);
    // // End total income data handling

    return (
        <>

        <h1>Audit: {budgetTitle}</h1>
        <div className='monthlyIncome'>
            <h3>Monthly Income: ${}</h3> {/* the 2000 is a placeholder until store is created */}
        </div>
        <div className='monthlySpending'>
            <h3>Monthly Spending: $2000{}</h3> {/* the 2000 is a placeholder until store is created */}
        </div>
        {/* 
        50/30/20 section intended to show the user what category they need to focus on when over spending
        */}
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