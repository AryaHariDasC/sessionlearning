const { body } = require('express-validator');
exports.loginValidator = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 5 }).withMessage('Password is invalid')
];
exports.createValidator=[
    body("firstname").notEmpty().withMessage("First name is required"),
    body("lastname").optional(),
    body("username").notEmpty().withMessage("User cannot empty"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("phone").isNumeric().withMessage("Phone number is invalid"),
    body("password").isLength({min:5}).withMessage("Password incorrect"),
    body("role").optional().isIn(["admin","teacher","student"]).withMessage("It must be teacher,student,admin")
]