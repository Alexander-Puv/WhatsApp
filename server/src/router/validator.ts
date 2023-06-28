import { body } from 'express-validator';

const validator = [ // validation
//username
body('username')
.isLength({min: 5, max: 30})
.withMessage('Username must contain >= 5 and <= 30 characters')
.custom((value) => {
  if (/\s/.test(value)) {
    throw new Error('Username must not contain spaces');
  }
  return true;
}),
// password
body('password')
  .isLength({min: 6, max: 20})
  .withMessage('Password must contain >= 6 and <= 20 characters')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)')
  .custom((val, { req }) => {
    if (val === req.body.username) {
      throw new Error('Password cannot be the same as username');
    }
    return true;
  })
]

export default validator