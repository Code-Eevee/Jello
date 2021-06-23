import React, { useState } from 'react';
import Column from '../components/Column';
import { DragDropContext } from 'react-beautiful-dnd';

//create a function to iterate through data from backend and manipluate it ot DND object

const Home = () => {
  // const [companies, setCompanies] = useState(['Telsa', 'Company 2', 'Company 3']);
  const filterObject = (arrObj) => {
    //iterate through the object
    const proto = ['user_id', 'company_name', 'outcomes', 'status'];
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
    obj = filterObject(obj);
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
  };
  //fetch rquest ->
  const data = [
    {
      user_id: 12,
      company_name: 'Amazon',
      status: 'applied',
      contact_name: '',
      contact_email: '',
      application_type: '',
      application_date: '',
      outcomes: 'Software Enginnering 2',
      notes: '',
    },
    {
      user_id: 13,
      company_name: 'Tesla',
      position: 'Software Engineer 1',
      status: 'phoneInterview',
      contact_name: '',
      contact_email: '',
      application_type: '',
      application_date: '',
      outcomes: 'Software Enginnering',
      notes: '',
    },
    {
      user_id: 15,
      company_name: 'Square',
      position: 'Software Engineer 1',
      status: 'phoneInterview',
      contact_name: '',
      contact_email: '',
      application_type: '',
      application_date: '',
      outcomes: 'Software Enginnering',
      notes: '',
    },
    {
      user_id: 15,
      company_name: 'Disney',
      position: 'Software Engineer 1',
      status: 'applied',
      contact_name: '',
      contact_email: '',
      application_type: '',
      application_date: '',
      outcomes: 'Software Enginnering',
      notes: '',
    },
    {
      user_id: 15,
      company_name: 'Oatly',
      position: 'Software Engineer 1',
      status: 'interview',
      contact_name: '',
      contact_email: '',
      application_type: '',
      application_date: '',
      outcomes: 'Software Enginnering',
      notes: '',
    },
  ];

  const appliedArray = [];
  const phoneInterviewArr = [];
  const interviewArr = [];
  parseObject(data);

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
  const [columns, setColumns] = useState(initialColumn);

  //   useEffect(() => {
  //     fetch('/api')
  //       .then(results => results.json())
  //         .then(data => {
  //           let date = data[0].createdAt;
  //           console.log(date);

  //           setExerciseList([...exerciselist, ...data]);
  //         });
  // }, []);

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
      console.log('companyname', start.companies[source.index]);
      console.log('companyobj - userID', start.companies[source.index].user_id);

      //pulls new status for card
      console.log('endID', end.id);

      //send updated status to the backend
      fetch('/data/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: start.companies[source.index].user_id,
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
  return (
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
          <Column col={col} key={col.id} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Home;
