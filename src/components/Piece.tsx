import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { PieceClass, PieceColor } from "../classes/Piece";

export const Piece = ({piece, posX, posY, handleClick}: {piece: PieceClass, posX: number, posY: number, handleClick: (piece: PieceClass) => void}) => {
    const keyProps = `${posX}-${posY}`;
    const filterValue = piece.color === PieceColor.White  ? 'invert(0)' : 'invert(1)';
    
    if (piece.posX === undefined || piece.posY === undefined) {
        piece.setPos(posX, posY);
    }

    return (
        <Draggable
        key={keyProps}
        draggableId={keyProps}
        index={Number('1' + posX + posY)}
        //Keep track of the turn and disable other pieces
        isDragDisabled={false}
        >
        {(provided, snapshot) => (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
            <img
                alt={`${piece.color} ${piece.type}`}
                src={`${piece.type}.png`}
                draggable="true"
                width="70px"
                height="70px"
                style={{cursor: 'pointer', filter: filterValue}}
                onMouseDown={() => handleClick(piece)}
            />
            </div>
        )}
        </Draggable>
    );
}
