const express = require('express');
const dataControllers = require('../Controllers/dataControllers');
const userControllers = require('../Controllers/userControllers');

const router = express.Router();

router.post('/signup', userControllers.createUser, (req, res) => {
  res.status(200).send({ newUserCreated: true });
});

router.get('/login',
  userControllers.verifyUser,
  dataControllers.getCompanies,
  (req, res) => {
    res.status(200).send(res.locals.companies);
});

//companies get
router.get('/companies', dataControllers.getCompanies, (req, res) => {
  res.status(200).send(res.locals.companies);
});

//event get
router.get('/events', dataControllers.getEvents, (req, res) => {
  res.status(200).send(res.locals.events);
});

// //company post
// router.post();

// //event post
// router.post();

// //company delete
// router.delete();

// //event delete
// router.delete();


module.exports = router;