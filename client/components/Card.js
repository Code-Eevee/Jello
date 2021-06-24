import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const CompanyCard = ({ text, position, date, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="Card"
        >
          {text}
          <br />
          {position}
          <br />
          {date.slice(0, 10)}
        </div>
      )}
    </Draggable>
  );
};

export default CompanyCard;
