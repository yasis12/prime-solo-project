const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    const { budgetTitle } = req.body;
    const userID = req.user.id;

    pool.query(
        `INSERT INTO "Budget" ("user_id", "budgetTitle") VALUES ($1, $2) RETURNING "id"`,
        [userID, budgetTitle]
    )
    .then(result => {
        const budgetID = result.rows[0].id;
        res.status(201).json({ message: 'budgetTitle saved successfully', budgetID });
    })
    .catch(error => {
        console.error('Error saving budgetTitle', error);
        res.status(500)
    });
  });


router.get('/', (req, res) => {
  // GET route code here
});



module.exports = router;