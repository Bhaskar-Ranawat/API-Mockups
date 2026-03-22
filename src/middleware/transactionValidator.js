const { body, validationResult } = require("express-validator");

const validateTransaction = [
  body("amount")
    .exists()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),
  body("type")
    .exists()
    .withMessage("Type is required")
    .trim()
    .toLowerCase()
    .isString()
    .isIn(["income", "expense", "misc"])
    .withMessage("Invalid type"),
  body("category")
    .exists()
    .withMessage("Catgeory is required")
    .trim()
    .toLowerCase()
    .isIn(["food", "essential", "car", "vacation"])
    .withMessage("Invalid category"),
  body("date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateTransaction;
