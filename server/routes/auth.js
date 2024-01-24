const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('../db');

router.post(
  '/signup',
  [
    check('email', 'Please input a valid email').isEmail(),
    check('password', 'Please input a password with a min of 6').isLength({
      min: 6,
    }),
    check('username', 'Please input a username with a min of 6').isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'This user already exists' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    return res.status(200).json({ token });
  }
);

router.post(
  '/login',
  [
    check('email', 'Please input a valid email').isEmail(),
    check('password', 'Please input a correct password').isLength({
      min: 2,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Email or password incorrect.' }] });
    }

    const isPasswordsMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatched) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Email or password incorrect.' }] });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      }
    );

    return res.status(200).json({ token });
  }
);

router.get('/me', async (req, res) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    // return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    return res.send(null);
  }

  const payload = bearerToken.split('Bearer ')[1];

  if (!payload) {
    return res.send(null);
  }

  const data = jwt.verify(payload, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return res.status(200).json(user);
});

module.exports = router;
