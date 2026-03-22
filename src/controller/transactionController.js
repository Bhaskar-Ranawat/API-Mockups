const {
  createTransactionService,
  getTransactionService,
} = require("../services/transactionService");

const createTransaction = async (req, res) => {
  try {
    // const { amount, type, category } = req.body;
    const transaction = await createTransactionService(req.body);
    return res.status(201).json({
      success: true,
      message: "Transaction registered successfully",
      data: transaction,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transactions = await getTransactionService(req.query);
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = {
  createTransaction,
  getTransaction,
};
