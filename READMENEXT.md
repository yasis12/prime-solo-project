# BUDGET BUDDY
I created this solo project during my time at Prime Digital Acedemy. I choose a finance app because of my interest in personal finance. By following a process similar to what is preformed in Budget Buddy I was able to reduce my spending by 20% since the previous year. Budget Buddy was created in hopes of aiding friends and family looking to change their spending behavior.

# Installation
Copy code
npm install
copy database.sql

# Dependencies
React
Redux
Axios
MUI

# Calculations
Explain the calculations performed in your application. Describe the purpose and results of each calculation function.
### Total Monthly Income

The `totalMonthlyIncome` function calculates the total monthly income for a selected budget. It filters income items based on the budget and sums up the prices.

```javascript
const totalMonthlyIncome = (incomeData, selectedBudget) => {
  // Filter income items for the selected budget
  const filteredIncome = incomeData.filter((item) => item.budget_id === selectedBudget);
  // Calculate the total income for the selected budget
  const totalIncome = filteredIncome.reduce((total, item) => total + item.price, 0);
  return totalIncome;
};
```
### Total Monthly Needs

The totalMonthlyNeeds function calculates the total monthly needs for a selected budget. It filters needs items based on the budget and sums up the prices.
```javascript
const totalMonthlyNeeds = (needsData, selectedBudget) => {
  // Filter needs items for the selected budget
  const filteredNeeds = needsData.filter((item) => item.budget_id === selectedBudget);
  // Calculate the total needs for the selected budget
  const totalNeeds = filteredNeeds.reduce((total, item) => total + item.price, 0);
  return totalNeeds;
};
```
### Total Monthly Wants
The totalMonthlyWants function calculates the total monthly wants for a selected budget. It filters wants items based on the budget and sums up the prices.
```javascript
const totalMonthlyWants = (wantsData, selectedBudget) => {
  // Filter wants items for the selected budget
  const filteredWants = wantsData.filter((item) => item.budget_id === selectedBudget);
  // Calculate the total wants for the selected budget
  const totalWants = filteredWants.reduce((total, item) => total + item.price, 0);
  return totalWants;
};
```
### Total Monthly Savings & Debts
The totalMonthlySavings function calculates the total monthly savings and debts for a selected budget. It filters savings and debts items based on the budget and allowed categories, then sums up the prices.
```javascript
const totalMonthlySavings = (savingsDebtsData, selectedBudget) => {
  const allowedCategories = [
    'emergencyFundContributions',
    'savingsAccountsContributions',
    // ... other allowed categories
  ];
  // Filter savings and debts items for the selected budget and allowed categories
  const filteredSavings = savingsDebtsData.filter((item) => {
    return item.budget_id === selectedBudget && allowedCategories.includes(item.category);
  });
  // Calculate the total savings for the selected budget
  const totalSavings = filteredSavings.reduce((total, item) => total + item.price, 0);
  return totalSavings;
};
```
### Total Debts
The totalDebts function calculates the total monthly debts for a selected budget. It filters debts items based on the budget and allowed categories, then sums up the prices.
```javascript
const totalDebts = (savingsDebtsData, selectedBudget) => {
  const allowedCategories = ['debts'];
  // Filter debts items for the selected budget and allowed categories
  const filteredDebts = savingsDebtsData.filter((item) => {
    return item.budget_id === selectedBudget && allowedCategories.includes(item.category);
  });
  // Calculate the total debts for the selected budget
  const totalDebts = filteredDebts.reduce((total, item) => total + item.price, 0);
  return totalDebts;
};
```
### POST Route
This post route from the needs.router was used as the template for the other components that had similar funcationality.

```javascript
router.post('/', (req, res) => {
  // POST route code here
  const { forms, budgetID } = req.body;
  const userID = req.user.id;

  // Database Insertion logic
  const insertPromises = [];
  // Insert forms data
  for (const category in forms) {
    if (forms.hasOwnProperty(category)) {
      const expensesArray = forms[category];

      // Loop through the array of expenses for the current category
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
          );
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
```
1. Destructuring Request Body:
>The route begins by extracting the forms and budgetID from the request body using destructuring.
>It also retrieves the userID from req.user.id, assuming that user information is stored in the request object.
2. Database Insertion Logic:
>The code initializes an array called insertPromises to store promises returned by the database insertion queries.
3. Insert Forms Data Loop:
>It iterates over each category in the forms object.
>For each category, it retrieves the array of expenses (expensesArray) associated with that category.
4. Loop Through Expenses:
>For each expense in the expensesArray, it checks if item.price exists.
>If the price exists, it pushes a query promise to the insertPromises array. The query inserts data into the "Needs" table with the provided values.
5. Promise Handling:
>After the loops, it uses Promise.all(insertPromises) to wait for all database insertion promises to resolve.
>If successful, it logs a success message and sends a response with a status code of 201 (Created).
>If there is an error, it logs an error message and sends a response with a status code of 500 (Internal Server Error), along with a JSON object containing an error message.