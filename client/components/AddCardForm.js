import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AddCardForm = ({ newCard, setNewCard, columns, setColumns }) => {
  console.log('setNewCard', setNewCard);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [applicationDate, setApplicationDate] = useState(null);
  // const [newCompanyCard, setNewCompanyCard] = useState([]);
  //add all data to this object
  // const [newCard, setNewCard] = useState({
  //   user_id: 1,
  //   status: 'applied',
  //   contact_name: 'NA',
  //   contact_email: 'NA',
  //   application_type: 'NA',
  //   notes: 'NA',
  // });

  const addHandler = () => {
    console.log('CLICK ADDHANDLER');
    let card = {};
    card['company_name'] = company;
    card['position_type'] = position;
    card['application_date'] = applicationDate;
    setNewCard({
      ...newCard,
      ...card,
    });
    setCompany('');
    setPosition('');
  };

  useEffect(() => {
    fetch('/data/addcompanies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('columns', columns);
        const newColumns = columns;
        Object.keys(newColumns).forEach((column) => {
          console.log('column', column);
          if (column === data.data.status) {
            newColumns[column]['companies'].push(data.data);
          }
        });
        setColumns({ ...columns, ...newColumns });
        setNewCard({
          user_id: 1,
          status: 'applied',
          contact_name: 'NA',
          contact_email: 'NA',
          application_type: 'NA',
          notes: 'NA',
        });
      });
  }, [newCard]);

  // console.log('addcardform newCompCard', newCompanyCard);

  return (
    <div className="AddCardForm">
      Company:
      <input
        type="text"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      <br />
      Position:
      <input
        type="text"
        onChange={(e) => {
          setPosition(e.target.value);
        }}
      />
      <input
        type="date"
        onChange={(e) => {
          setApplicationDate(e.target.value);
          console.log(applicationDate);
        }}
      />
      <button onClick={addHandler}>ADD</button>
    </div>
  );
};

export default AddCardForm;
