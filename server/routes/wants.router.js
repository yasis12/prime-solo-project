const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    // POST route code here
    console.log('is authenticated?', req.isAuthenticated());
    console.log('User', req.user.id);
    const { forms, budgetID } = req.body;
    console.log('Needs Data', forms);
    console.log('Budget ID', budgetID);
  
    const userID = req.user.id;
  
    // Database Insertion logic
    const insertPromises = [];
    //Insert forms data
    for (const category in forms) {
      if (forms.hasOwnProperty(category)) {
          const expensesArray = forms[category];
  
          //loop through the array of expenses for the current category
          expensesArray.forEach((item) => {
              if (item.price) {
                  insertPromises.push(
                      pool.query(
                          'INSERT INTO "Wants" ("price", "description", "category", "user_id", "budget_id") VALUES($1, $2, $3, $4, $5)',
                          [
                              parseInt(item.price),
                              item.description,
                              category,
                              userID,
                              budgetID,
                          ]
                      )
                  )
              }
          });
      }
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
  }); // END post Route

router.get('/', (req, res) => {
       // GET route code here
       const userID = req.user.id;
 
       pool.query(
         'SELECT * FROM "Wants" WHERE user_id = $1',
         [userID]
       )
       .then((result) => {
         const wantsData = result.rows;
         res.send(wantsData);
       })
       .catch((error) => {
         console.error('Error fetching Wants', error);
         res.status(500).json({ error: 'An error occurred while fetching Wants' });
       });
  });

module.exports = router;