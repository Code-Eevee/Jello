import React, { useState } from 'react'
import Column from '../components/Card';
import { DragDropContext } from 'react-beautiful-dnd';


const Home = () => {
// const [companies, setCompanies] = useState(['Telsa', 'Company 2', 'Company 3']);
    
    const initialColumn = {
        applied: {
            id: 'applied',
            companies: ['Tesla', 'Square', 'Oscar Health']
        },
        phoneInterview: {
            id: 'phoneInterview',
            companies: []
        },
        interview: {
            id: 'interview',
            companies: []
        }
    };
    
    const [columns, setColumns] = useState(initialColumn);
    
    const onDragEnd = ({source, destination})=> {


        //make sure we have valid destination
        if(destination === undefined || destination == null) return null;
        // If the source and destination columns are the same
        // AND if the index is the same, the item isn't moving
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null;
        
        const start = columns[source.droppableId];
        const end = columns[destination.droppableId];
        if(start === end){
            const newCompanies = start.companies.filter((_, idx)=> idx !== source.index);
            newCompanies.splice(destination.index, 0, start.companies[source.index])
            const newCol = {
                id: start.id,
                companies: newCompanies
              }
            setColumns(state => ({...state, [newCol.id]: newCol}));
            return null;
        }else{
            const newStartCompanies = start.companies.filter(
                (_ ,idx) => idx !== source.index
            )
            const newStartCol = {
                id: start.id,
                companies : newStartCompanies
            }

            const newEndCompanies = end.companies;
            newEndCompanies .splice(destination.index, 0, start.companies[source.index])

            // Create a new end column
            const newEndCol = {
                id: end.id,
                companies: newEndCompanies
            }
            setColumns(state => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol
              }))
              return null

            }
           
        }
        return (
            <DragDropContext onDragEnd = {onDragEnd}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    margin: '24px auto',
                    width: '80%',
                    gap: '8px'
                }}
             >
            {
                Object.values(columns).map(col =>(
                    <Column col = {col} key = {col.id}/>
                ))
            }
            </div>
            </DragDropContext>
          )
}

export default Home;
