const { validationResult } = require('express-validator');
const Stadium = require('../models/Stadium');

const validateStadium = [
    // Validate stadium name
    check('name')
      .notEmpty()
      .withMessage('Stadium name is required'),
  
    // Validate stadium location
    check('address.city')
      .notEmpty()
      .withMessage('City is required'),
    check('address.state')
      .notEmpty()
      .withMessage('State is required'),
    check('address.country')
      .notEmpty()
      .withMessage('Country is required'),
  
    // Validate stadium capacity
    check('capacity')
      .isNumeric()
      .withMessage('Capacity must be a number')
      .notEmpty()
      .withMessage('Capacity is required'),
  
    // Validate stadium status
    check('status')
      .isIn(['active', 'inactive']) // Assuming status can only be 'active' or 'inactive'
      .withMessage('Status must be active or inactive')
  ];

  module.exports = {
    validateStadium,
  }