const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// income POST ROUTER
router.post('/income', (req, res) => {
    console.log('Income Data',req.body);
    // POST route code here
  });

// Income GET route
router.get('/income', (req, res) => {
    // GET route code here
  });

  module.exports = router;