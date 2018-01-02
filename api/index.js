const { Router } = require('express');

const router = Router();

router.use('/auth', require('./routes/auth.route'));
router.use('/users', require('./routes/user.route'));

module.exports = router;
