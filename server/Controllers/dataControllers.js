const dataModel = require('../dataModel');

const dataControllers = {};

//company get
dataControllers.getCompanies = (req, res, next)=> {
  const userID = [res.locals.user[0]._id];
  const query_text = `SELECT * FROM company_table WHERE user_id = $1;`;
  dataModel.query(query_text, userID, (err, query_res) => {
      if (err) {
          return next({log: err.stack});
      } else {
          res.locals.companies = query_res.rows;
          return next();
      }
  });
};

//event get
dataControllers.getEvents = (req, res, next) => {
  const companyID = [req.body.companyID];
  const query_text = `SELECT * FROM events_table WHERE company_id = $1;`;
  dataModel.query(query_text, companyID, (err, query_res) => {
    if (err) {
      return next({log: err});
    } else {
      res.locals.events = query_res.rows;
      return next();
    }
  });
};

// dataControllers.postsomething = (req, res, next) => {

// };

// dataControllers.deletesomething = (req, res, next) => {

// };

module.exports = dataControllers;