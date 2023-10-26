const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route
router.get('/', (req, res) => {
  const userID = req.user.id;
 
  pool.query(
    'SELECT * FROM "BudgetComments" WHERE user_id = $1',
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

// POST route
router.post('/', (req, res) => {
    const { comment, budgetID } = req.body;
    const userID = req.user.id;

    console.log('comment', comment);
    console.log('budget ID', budgetID);
    console.log('userID', userID);

    pool.query(
        `INSERT INTO "BudgetComments" ("comments", "user_id", "budget_id") VALUES ($1, $2, $3)`,
        [comment, userID, budgetID]
    )
    .then(result => {
        res.status(201).json({ message: 'Comment saved successfully', budgetID, comment });
    })
    .catch(error => {
        console.error('Error saving Comment', error);
        res.status(500)
    });
});

// DELETE route
router.delete('/:id', (req,res) => {
    
});

// Update Route

router.update('/:id', (res, req) => {

});

module.exports = router;