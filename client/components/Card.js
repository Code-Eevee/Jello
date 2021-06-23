import React from 'react';
import Card from './Company';
import { Droppable } from 'react-beautiful-dnd';


const Column =({col: { companies, id }}) =>{
    return (
        <Droppable droppableId={id}>
        {provided => (
        <div
          style={{
              display: 'flex',
              flexDirection: 'column'
          }}
          >
          <h2>{id}</h2>
          <div
           style={{
               display: 'flex',
               flexDirection: 'column',
               minHeight: '120px'
           }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {companies.map((text, index) => (
              <Card key={text} text={text} index={index} />
          ))}
          {provided.placeholder}
         </div>
        </div>
        )}
        </Droppable>
    )
}

export default Column;
