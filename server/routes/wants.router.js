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
  }); // END post Route

router.get('/', (req, res) => {
    // GET route code here
  });

module.exports = router;