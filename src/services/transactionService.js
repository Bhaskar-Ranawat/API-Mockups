const transactionModel = require("../model/TransactionModel");

const createTransactionService = async (data) => {
  const { amount, type, category } = data;
  const transaction = await transactionModel.create({
    amount,
    type,
    category,
  });
  return transaction;
};

const getTransactionService = async (filters) => {
  const { type, category } = filters;
  //   just to santize the user inputted object
  const filter = {};
  if (type) {
    filter.type = type;
  }
  if (category) {
    filter.category = category;
  }
  const transactions = await transactionModel.find(filter).sort({ date: -1 });
  return transactions;
};

module.exports = {
  createTransactionService,
  getTransactionService,
};
