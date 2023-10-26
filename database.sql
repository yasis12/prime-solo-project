
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "Income" (
  "price" int NOT NULL,
  "description" VARCHAR(250),
  "category" VARCHAR(50) NOT NULL,
  "user_id" int NOT NULL,
  "budget_id" int NOT NULL
);

CREATE TABLE "Needs" (
  "price" int NOT NULL,
  "description" VARCHAR(250),
  "category" VARCHAR(50) NOT NULL,
  "user_id" int NOT NULL,
  "budget_id" int NOT NULL
);

CREATE TABLE "Wants" (
  "price" int NOT NULL,
  "description" VARCHAR(250),
  "category" VARCHAR(50) NOT NULL,
  "user_id" int NOT NULL,
  "budget_id" int NOT NULL
);

CREATE TABLE "SavingsDebts" (
  "price" int NOT NULL,
  "description" VARCHAR(250),
  "category" VARCHAR(50) NOT NULL,
  "user_id" int NOT NULL,
  "budget_id" int NOT NULL
);

CREATE TABLE "BudgetComments" (
  "comments" VARCHAR(1000),
  "user_id" int NOT NULL,
  "budget_id" int NOT NULL
);

CREATE TABLE "Budget" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int NOT NULL,
  "budgetTitle" VARCHAR(50) NOT NULL
);


ALTER TABLE "Budget" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "Income" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "Income" ADD FOREIGN KEY ("budget_id") REFERENCES "Budget" ("id");
ALTER TABLE "Needs" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "Needs" ADD FOREIGN KEY ("budget_id") REFERENCES "Budget" ("id");
ALTER TABLE "Wants" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "Wants" ADD FOREIGN KEY ("budget_id") REFERENCES "Budget" ("id");
ALTER TABLE "SavingsDebts" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "SavingsDebts" ADD FOREIGN KEY ("budget_id") REFERENCES "Budget" ("id");
ALTER TABLE "BudgetComments" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "BudgetComments" ADD FOREIGN KEY ("budget_id") REFERENCES "Budget" ("id");
