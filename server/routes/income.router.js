const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// income POST ROUTER
router.post('/', (req, res) => {
    console.log('Income POST route reached');
    // POST route code here
    const { incomeData, budgetID } = req.body;
    console.log('Income Data', incomeData);
    console.log('Budget ID', budgetID);


  });

// Income GET route
router.get('/income', (req, res) => {
    // GET route code here
  });

  module.exports = router;