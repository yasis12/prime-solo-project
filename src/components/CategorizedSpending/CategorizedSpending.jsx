import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CategorizedSpending() {

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
  
    return (
        <>
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

        
        </>
    )
}

export default CategorizedSpending;