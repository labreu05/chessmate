import React from "react";
import { Droppable } from 'react-beautiful-dnd';

export const Square = (props: any) => {
    return (
        <Droppable droppableId={props.id}>
            {(provided, snapshot) => (
                <div 
                    className="chess-square"
                    ref={provided.innerRef}
                    style={{ backgroundColor: snapshot.isDraggingOver ? '#3fbcec' : '' }}
                >
                    {props.children}
                    {provided.placeholder}
                </div>

            )}
        </Droppable>
    );
}
