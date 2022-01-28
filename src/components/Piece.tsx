import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ChessPiece, PieceColor } from "../classes/ChessPiece";

export const Piece = ({piece, posX, posY, handleClick}: {piece: ChessPiece, posX: number, posY: number, handleClick: (piece: ChessPiece) => void}) => {
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
