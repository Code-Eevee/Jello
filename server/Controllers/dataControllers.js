const dataModel = require('../dataModel');

const dataControllers = {};

//company get
dataControllers.getCompanies = (req, res, next) => {
  const userID = [req.body.userID];
  const query_text = `SELECT * FROM company_table WHERE user_id = $1;`;
  dataModel.query(query_text, userID, (err, query_res) => {
    if (err) {
      return next({ log: err.stack });
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
      return next({ log: err });
    } else {
      res.locals.events = query_res.rows;
      return next();
    }
  });
};

//company add
dataControllers.addCompany = (req, res, next) => {
  console.log('HTTING THIS ADD COmpany');
  const body = req.body;
  console.log(body);
  const companyInformation = [
    body.user_id,
    body.company_name,
    body.status,
    body.contact_name,
    body.contact_email,
    body.application_type,
    body.application_date,
    body.notes,
    body.position_type,
  ];
  console.log('companyInformation', companyInformation);
  // INSERT INTO public.company_table(
  //  VALUES (1, 'Apple', 'phoneInterview', 'Cors', 'cors@gmail.com', 'Linkedin', TO_DATE('01/12/2021', 'DD/MM/YYYY'), 'Iphone', 'Software Engineer');

  const query_text = `INSERT INTO public.company_table(
    user_id, company_name, status, contact_name, contact_email, application_type, application_date, notes, position_type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

  dataModel.query(query_text, companyInformation, (err, query_res) => {
    if (err) {
      console.log('ERR');

      return next({ log: err });
    } else {
      console.log('Qeury-Est', query_res.rows[0]);
      res.locals.quer_res = query_res.rows[0];
      return next();
    }
  });
};

//event add
dataControllers.addEvent = (req, res, next) => {
  const body = req.body;
  const eventInformation = [
    body.company_id,
    body.event_type,
    body.date,
    body.interviewer_name,
    body.interviewer_email,
    body.notes,
  ];
  const query_text = `INSERT INTO event_table (company_id, event_type, date, interviewer_name, interviewer_email, notes)
  VALUES ($1, $2, $3, $4, $5, $6);`;
  dataModel.query(query_text, eventInformation, (err, query_res) => {
    if (err) {
      return next({ log: err });
    } else {
      return next();
    }
  });
};

//company delete
dataControllers.deleteCompany = (req, res, next) => {
  const companyID = [req.body.companyID];
  const query_text = `DELETE FROM company_table WHERE _id = $1;`;
  dataModel.query(query_text, companyID, (err, query_res) => {
    if (err) {
      return next({ log: err });
    } else {
      return next();
    }
  });
};

//event delete
dataControllers.deleteEvent = (req, res, next) => {
  const eventID = [req.body.eventID];
  const query_text = `DELETE FROM events_table WHERE _id = $1;`;
  dataModel.query(query_text, eventID, (err, query_res) => {
    if (err) {
      return next({ log: err });
    } else {
      return next();
    }
  });
};

//company patch
dataControllers.editCompany = (req, res, next) => {
  const body = req.body;
  const companyInformation = [
    body.companyID,
    body.user_id,
    body.company_name,
    body.status,
    body.contact_name,
    body.contact_email,
    body.application_type,
    body.application_date,
    body.position_type,
    body.notes,
  ];
  const query_text = `UPDATE company_table
    SET user_id = $2,
      company_name = $3,
      status = $4,
      contact_name = $5,
      contact_email = $6,
      application_type = $7,
      application_date = $8,
      position_type = $9,
      notes = $10
    WHERE _id = $1;`;
  dataModel.query(query_text, companyInformation, (err, query_res) => {
    if (err) {
      return next({ log: err });
    } else {
      return next();
    }
  });
};

//statuspatch
dataControllers.editStatus = (req, res, next) => {
  const body = req.body;
  const companyInformation = [body._id, body.status];
  const query_text = `UPDATE company_table
    SET status = $2
        WHERE _id = $1;`;
  dataModel.query(query_text, companyInformation, (err, query_res) => {
    if (err) {
      return next({ log: err });
    } else {
      return next();
    }
  });
};
//events patch
dataControllers.editEvent = (req, res, next) => {
  const body = req.body;
  const eventInformation = [
    body.eventID,
    body.company_id,
    body.event_type,
    body.date,
    body.interviewer_name,
    body.interviewer_email,
    body.notes,
  ];
  const query_text = `UDPATE events_table
  SET company_id = $2,
    event_type = $3,
    date = $4,
    interviewer_name = $5,
    interviewer_email = $6,
    notes = $7
  WHERE _id = $1;`;
  dataModel.query(query_text, eventInformation, (err, query_res) => {
    if (err) {
      return next({ log: err });
    } else {
      return next();
    }
  });
};

module.exports = dataControllers;
