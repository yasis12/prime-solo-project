const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const incomeRouter = require('./routes/income.router');
const needsRouter = require('./routes/needs.router');
const wantsRouter = require('./routes/wants.router');
const savingsDebtsRouter = require('./routes/savingsDebts.router');
const budgetIDRouter = require('./routes/budgetID.router');
const commentsRouter = require('./routes/comments.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/income', incomeRouter);
app.use('/api/needs', needsRouter);
app.use('/api/wants', wantsRouter);
app.use('/api/savingsdebts', savingsDebtsRouter);
app.use('/api/budgetID', budgetIDRouter);
app.use('/api/comments', commentsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
