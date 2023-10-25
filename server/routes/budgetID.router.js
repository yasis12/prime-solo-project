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
  const userID = req.user.id;

  pool.query(
    'SELECT "id", "budgetTitle" FROM "Budget" WHERE user_id = $1',
    [userID]
  )
  .then((result) => {
    const budgets = result.rows;
    res.send(budgets);
  })
  .catch((error) => {
    console.error('Error fetching budgets', error);
    res.status(500).json({ error: 'An error occurred while fetching budgets' });
  });
});

router.get('/all', (req, res) => {
  // GET route code here
  const userID = req.user.id;

  pool.query(
    'SELECT "budgetTitle" FROM "Budget" WHERE user_id = $1',
    [userID]
  )
  .then((result) => {
    const budgets = result.rows;
    res.send(budgets);
  })
  .catch((error) => {
    console.error('Error fetching budgets', error);
    res.status(500).json({ error: 'An error occurred while fetching budgets' });
  });
});



module.exports = router;