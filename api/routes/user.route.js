const co = require('co');
const { Router } = require('express');
const User = require('../models/user.model');

const {
  getOne, create, update, deleteOne
} = require('../config/crud');

const { authMiddleware, hashPassword } = require('../config/auth');

const userPostMiddleware = user =>
  co(function* middleware() {
    const u = user;
    if (u.password) u.passwordHash = yield hashPassword(u.password);

    return u;
  });

const router = Router();

router.get('/:id', authMiddleware, getOne(User));

router.post('/', (req, res) =>
  userPostMiddleware(req.body)
    .then(d => create(User)(d)(req, res)));

router.post('/:id', authMiddleware, update(User));

router.delete('/:id', authMiddleware, deleteOne(User));

module.exports = router;
