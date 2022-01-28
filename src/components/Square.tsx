import React from "react";
import { Droppable } from 'react-beautiful-dnd';

export const Square = (props: any) => {
    return (
        // TODO: Disable dropping?
        <Droppable droppableId={props.id} isDropDisabled={!props.canMove}>
            {(provided, snapshot) => (
                <div 
                    className="chess-square"
                    ref={provided.innerRef}
                    style={{
                        backgroundColor: snapshot.isDraggingOver ? '#3fbcec' : '',
                        boxShadow: (props.canKill ? 'inset rgb(255 0 0) 0px 0px 10px 2px' : (props.canMove? 'inset rgb(0 255 0) 0px 0px 10px 2px': 'none'))}}
                >
                    {props.children}
                    {provided.placeholder}
                </div>

            )}
        </Droppable>
    );
}
