const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// income POST ROUTER
router.post('/', (req, res) => {
    // POST route code here
    console.log('is authenticated?', req.isAuthenticated());
    console.log('User', req.user.id);
    const { incomeData, budgetID } = req.body;
    console.log('Income Data', incomeData);
    console.log('Budget ID', budgetID);

    const userID = req.user.id;

    // Database insertion logic
    const insertPromises = [];

        // Insert wages after tax
        insertPromises.push(
            pool.query(
            'INSERT INTO "Income" ("price", "description", "category", "user_id", "budget_id") VALUES($1, $2, $3, $4, $5)',
            [
                parseInt(incomeData.wagesAfterTax.price),
                incomeData.wagesAfterTax.description,
                'wagesAfterTax',
                userID,
                budgetID,
            ]
            )
        );

        // Insert otherIncomeForm
        if (incomeData.otherIncomeForm.length > 0) {
            incomeData.otherIncomeForm.forEach((item) => {
            if (item.price) {
                insertPromises.push(
                pool.query(
                    'INSERT INTO "Income" ("price", "description", "category", "user_id", "budget_id") VALUES($1, $2, $3, $4, $5)',
                    [
                    parseInt(item.price),
                    item.description,
                    'otherIncome',
                    userID,
                    budgetID,
                    ]
                )
                );
            }
            });
        }

    Promise.all(insertPromises)
        .then(() => {
            console.log('Data inserted successfully');
            res.sendStatus(201); // Created
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
  });



// Income GET route
router.get('/', (req, res) => {
  // GET route code here
  const userID = req.user.id;

  pool.query(
    'SELECT * FROM "Income" WHERE user_id = $1',
    [userID]
  )
  .then((result) => {
    const incomeData = result.rows;
    res.send(incomeData);
  })
  .catch((error) => {
    console.error('Error fetching income', error);
    res.status(500).json({ error: 'An error occurred while fetching income' });
  });
  });

  module.exports = router;