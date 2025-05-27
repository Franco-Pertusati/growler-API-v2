const express = require('express');
const usersRouter = require('./users');
const categoryRouter = require('./categories');
const diningTableRouter = require('./diningTable');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/categories', categoryRouter);
router.use('/dining-tables', diningTableRouter);

module.exports = router;
