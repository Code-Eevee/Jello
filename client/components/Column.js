import React from 'react';
import CompanyCard from './Card';
import { Droppable } from 'react-beautiful-dnd';
import '../scss/card.scss';
import AddCardButton from './AddCardButton';

const Column = ({
  col: { companies, id },
  newCard,
  setNewCard,
  columns,
  setColumns,
}) => {
  return (
    <div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '10px',
            }}
          >
            <h2>{id.charAt(0).toUpperCase() + id.slice(1)}</h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                // minHeight: '120px',
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {companies.map((text, index) => (
                <CompanyCard
                  key={text.company_name}
                  text={text.company_name}
                  position={text.position_type}
                  date={text.application_date}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <div>
        <AddCardButton
          newCard={newCard}
          setNewCard={setNewCard}
          columns={columns}
          setColumns={setColumns}
        />
      </div>
    </div>
  );
};

export default Column;
