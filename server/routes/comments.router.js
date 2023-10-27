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
router.delete('/:id', (req, res) => {
  const commentId = req.params.id;

  pool.query(
    'DELETE FROM "BudgetComments" WHERE id = $1',
    [commentId]
  )
    .then((result) => {
      res.status(204).json({ message: 'Comment deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting Comment', error);
      res.status(500)
    });
});

// Update Route
router.put('/:id', (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;
  console.log('Comment ID', commentId);
  console.log('Comment edit', comment);
  pool.query(
    'UPDATE "BudgetComments" SET "comments" = $1 WHERE "id" = $2',
    [comment, commentId]
  )
    .then((result) => {
      res.json({ message: 'Comment updated successfully' });
    })
    .catch((error) => {
      console.error('Error updating Comment', error);
      res.status(500).json({ error: 'An error occurred while updating the comment' });
    });
});

module.exports = router;