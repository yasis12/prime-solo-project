const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  // GET route code here
});


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

router.delete('/:id', (req,res) => {
    
});

module.exports = router;