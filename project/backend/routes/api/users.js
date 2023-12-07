const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors
];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);

      const findUser = await User.findOne({
          where: {username: username}
      })

      const findEmail = await User.findOne({
          where:{email: email}
      })

      if(findUser){
        const err = new Error()
            err.message = 'User already exists'
            err.errors = {
                username: "User with that username already exists"
            }
            res.status(500)
            return res.json(err)
      }

      if(findEmail){
        const err = new Error()
            err.message = 'User already exists'
            err.errors = {
                email: "User with that email already exists"
            }
            res.status(500)
            return res.json(err)
      }

      const user = await User.create({ firstName, lastName, email, username, hashedPassword });



      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );

  module.exports = router;
