const express = require("express");
const router = express.Router();
const transactionModel = require("../model/TransactionModel");

const validateTransaction = require("../middleware/transactionValidator");
const {
  createTransaction,
  getTransaction,
} = require("../controller/transactionController");

router.post("/transactions", validateTransaction, createTransaction);

router.get("/transactions", getTransaction);

module.exports = router;

/**
 * Mental model for cope rafactoring and making it a senior level dev code
 * 
 * Route → Middleware → Controller → Service → Model (DB) → Response
 * 
 *  Client
    ↓
    Route
    ↓
    Middleware (validation/auth)
    ↓
    Controller (thin layer)
    ↓
    Service (heavy logic)
    ↓
    Model (MongoDB)
    ↓
    Controller
    ↓
    Response

    now move towards the gold level code
    Features We Add

Pagination → page, limit

Sorting → sortBy, order

Filtering → type, category

Range filters → minAmount, maxAmount

Date filters → startDate, endDate
 */
