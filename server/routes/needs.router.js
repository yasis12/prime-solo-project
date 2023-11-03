const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Post Route
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
                        'INSERT INTO "Needs" ("price", "description", "category", "user_id", "budget_id") VALUES($1, $2, $3, $4, $5)',
                        [
                            parseInt(item.price),
                            item.description,
                            category,
                            userID,
                            budgetID,
                        ]
                    )
                )
                res.sendStatus(201);
            }
        });
    }
  }
}); // END post Route

//Get Route
router.get('/', (req, res) => {
   // GET route code here
   const userID = req.user.id;
 
   pool.query(
     'SELECT * FROM "Needs" WHERE user_id = $1',
     [userID]
   )
   .then((result) => {
     const needsData = result.rows;
     res.send(needsData);
   })
   .catch((error) => {
     console.error('Error fetching needs', error);
     res.status(500).json({ error: 'An error occurred while fetching needs' });
   });
  });

module.exports = router;
