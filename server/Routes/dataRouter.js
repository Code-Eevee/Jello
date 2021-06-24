const express = require('express');
const { useRouteMatch } = require('react-router');
const dataControllers = require('../Controllers/dataControllers');
const userControllers = require('../Controllers/userControllers');

const router = express.Router();

router.post('/signup', userControllers.createUser, (req, res) => {
  res.status(200).send({ newUserCreated: true });
});

router.post('/login', userControllers.verifyUser, (req, res) => {
  res.status(200).send({ userVerified: true, userID: res.locals.userID });
});

//companies get
router.post('/companies', dataControllers.getCompanies, (req, res) => {
  res.status(200).send(res.locals.companies);
});

//event get
router.get('/events', dataControllers.getEvents, (req, res) => {
  res.status(200).send(res.locals.events);
});

//company post
router.post('/addcompanies', dataControllers.addCompany, (req, res) => {
  res.status(200).send({ data: res.locals.quer_res });
});

//event post
router.post('/events', dataControllers.addEvent, (req, res) => {
  res.status(200).send({ newEventAdded: true });
});

//company delete
router.delete('/companies', dataControllers.deleteCompany, (req, res) => {
  res.status(200).send({ companyDeleted: true });
});

//event delete
router.delete('/events', dataControllers.deleteEvent, (req, res) => {
  res.status(200).send({ eventDeleted: true });
});

//company edit
router.patch('/companies', dataControllers.editCompany, (req, res) => {
  res.status(200).send({ companyUpdated: true });
});

router.patch('/status', dataControllers.editStatus, (req, res) => {
  res.status(200).send({ statusUpdated: true });
});

//event edit
router.patch('/events', dataControllers.editEvent, (req, res) => {
  res.status(200).send({ eventUpdated: true });
});

module.exports = router;
