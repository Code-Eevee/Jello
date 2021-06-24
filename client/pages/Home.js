import React, { useState, useEffect } from 'react';
import Column from '../components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import AddCardButton from '../components/AddCardButton';
import Col from 'react-bootstrap/Col';
//create a function to iterate through data from backend and manipluate it ot DND object

const Home = ({ userID }) => {
  const [newCard, setNewCard] = useState(() => ({
    user_id: userID,
    status: 'applied',
    contact_name: 'NA',
    contact_email: 'NA',
    application_type: 'NA',
    notes: 'NA',
  }));

  const filterObject = (arrObj) => {
    //iterate through the objects
    const proto = [
      'user_id',
      'company_name',
      'position_type',
      'status',
      'application_date',
      '_id',
    ];
    let result = [];
    arrObj.forEach((obj) => {
      let newObj = {};
      Object.keys(obj).forEach((e) => {
        if (proto.includes(e)) {
          newObj[e] = obj[e];
        }
      });
      result.push(newObj);
    });
    return result;
  };

  const parseObject = (obj) => {
    const appliedArray = [];
    const phoneInterviewArr = [];
    const interviewArr = [];

    // obj = filterObject(obj);
    obj.forEach((object) => {
      if (object.status === 'applied') {
        appliedArray.push(object);
      }
      if (object.status === 'phoneInterview') {
        phoneInterviewArr.push(object);
      }
      if (object.status === 'interview') {
        interviewArr.push(object);
      }
    });

    const initialColumn = {
      applied: {
        id: 'applied',
        companies: appliedArray,
      },
      phoneInterview: {
        id: 'phoneInterview',
        companies: phoneInterviewArr,
      },
      interview: {
        id: 'interview',
        companies: interviewArr,
      },
    };

    return initialColumn;
  };

  const [columns, setColumns] = useState({});

  useEffect(() => {
    fetch('/data/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: userID }),
    })
      .then((data) => data.json())
      .then((res) => {
        const parsedata = parseObject(res);
        setColumns({ ...parsedata });
      });
  }, []);

  const onDragEnd = ({ source, destination }) => {
    //make sure we have valid destination
    if (destination === undefined || destination == null) return null;
    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = columns[source.droppableId];

    const end = columns[destination.droppableId];
    //take the information from start card, and send update of status to backend with end

    if (start === end) {
      const newCompanies = start.companies.filter(
        (_, idx) => idx !== source.index
      );
      newCompanies.splice(destination.index, 0, start.companies[source.index]);
      const newCol = {
        id: start.id,
        companies: newCompanies,
      };
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      //send updated status to the backend
      fetch('/data/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: start.companies[source.index]._id,
          status: end.id,
        }),
      })
        .then((data) => data.json())
        .then((res) => console.log(res));

      const newStartCompanies = start.companies.filter(
        (_, idx) => idx !== source.index
      );
      const newStartCol = {
        id: start.id,
        companies: newStartCompanies,
      };

      const newEndCompanies = end.companies;
      newEndCompanies.splice(
        destination.index,
        0,
        start.companies[source.index]
      );

      // Create a new end column
      const newEndCol = {
        id: end.id,
        companies: newEndCompanies,
      };
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };
  console.log('columns', columns);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            margin: '24px auto',
            width: '80%',
            gap: '8px',
          }}
        >
          {Object.values(columns).map((col) => (
            <Column
              columns={columns}
              setColumns={setColumns}
              col={col}
              key={col.id}
              newCard={newCard}
              setNewCard={setNewCard}
            />
          ))}
        </div>
      </DragDropContext>
      {/* <Col> */}
      {/* </Col> */}
    </div>
  );
};

export default Home;
