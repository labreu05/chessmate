import React from "react";
import { Droppable } from 'react-beautiful-dnd';

type Props = {
    id: string;
    canMove: boolean;
    underAttack: boolean;
    children: JSX.Element | null;
}

export const Square = ({id, canMove, underAttack, children}: Props) => {
    return ( 
        <Droppable droppableId={id} isDropDisabled={!canMove}>
            {(provided, snapshot) => (
                <div 
                    className="chess-square"
                    ref={provided.innerRef}
                    style={{
                        backgroundColor: snapshot.isDraggingOver ? '#3fbcec' : '',
                        boxShadow: (underAttack ? 'inset rgb(255 0 0) 0px 0px 10px 2px' : (canMove? 'inset rgb(0 255 0) 0px 0px 10px 2px': 'none'))}}
                >
                    {children}
                    {provided.placeholder}
                </div>

            )}
        </Droppable>
    );
}
