
/**
 * Custom Validators
 * 
 * Custom Joi validation functions for common use cases.
 */
const mongoose = require('mongoose');

/**
 * Validate MongoDB ObjectId
 */
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

/**
 * Validate password strength
 */
const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error('password.tooShort');
  }
  if (!/\d/.test(value)) {
    return helpers.error('password.noNumber');
  }
  if (!/[a-z]/.test(value)) {
    return helpers.error('password.noLowercase');
  }
  if (!/[A-Z]/.test(value)) {
    return helpers.error('password.noUppercase');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
    return helpers.error('password.noSpecialChar');
  }
  return value;
};

module.exports = {
  objectId,
  password
};
