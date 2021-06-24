import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const CompanyCard = ({ text, position, date, index }) => {
  return (
    <div className= "Card-container">
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="Card"
        >
          <p>{text}</p>
          <p>{position}</p>
          <p>{date.slice(0, 10)}</p>
        </div>
      )}
    </Draggable>
    </div>
  );
};

export default CompanyCard;
