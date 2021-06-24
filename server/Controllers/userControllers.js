const dataModel = require('../dataModel');
const bcrypt = require('bcrypt');


const userControllers = {};

//user verify
userControllers.verifyUser = (req, res, next) => {
  const userEmail = [req.body.email];
  console.log('this is useremail', userEmail);
  console.log('this is reqbodypass', req.body.password);
  const query_text = `SELECT * FROM user_table WHERE email = $1;`
  dataModel.query(query_text, userEmail, (err, query_res) => {
    if(err) {
      return next({log: err});
    } else if(query_res.rows.length === 0){
      return res.status(400).send({userVerified: false});
    } else {
      console.log('this is rows', query_res.rows);
      bcrypt.compare(req.body.password, query_res.rows[0].password, (err, isMatched) => {
        if (isMatched === false) {
          return res.status(400).send({userVerified: false});
        } else {
          res.locals.userID = query_res.rows[0]._id;
          return next();
        }
      });
    };
  });
};

//user create
userControllers.createUser = async (req, res, next) => {
  const body = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  const userInformation = [
    body.first_name,
    body.last_name,
    body.email,
    hashedPassword
  ];

  const query_text = `INSERT INTO user_table (first_name, last_name, email, password) 
  VALUES ($1, $2, $3, $4) RETURNING _id;`;
  dataModel.query(query_text, userInformation, (err, query_res) => {
    console.log(query_res);
    if(err){
      return next({log: err});
    } else {
      res.locals.newUserID = query_res.rows[0]._id;
      return next();
    }
  });
}

module.exports = userControllers;