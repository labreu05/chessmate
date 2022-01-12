import React from "react";
import { Draggable } from "react-beautiful-dnd";

enum PieceColor {
    Black = 'black', White = 'white'
}

enum PieceType {
    King = 'king',
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn'
}

// Make this a class to be able to instantiate
export type PieceProps = {
    color: PieceColor
    type: PieceType
    // if no pos available it should assign the one 
    posX: number;
    posY: number;
    moveCount: number;
}

export const testPiece1: PieceProps = {
    color: PieceColor.Black,
    type: PieceType.King,
    posX: 0,
    posY: 0,
    moveCount: 0,
};

export const testPiece2: PieceProps = {
    color: PieceColor.White,
    type: PieceType.Rook,
    posX: 0,
    posY: 1,
    moveCount: 0,
};

export const Piece = ({piece}: {piece: PieceProps}) => {
    const keyProps = `${piece.posX}-${piece.posY}`;
    const filterValue = piece.color === PieceColor.Black  ? 'invert(0)' : 'invert(1)';

    return (
        <Draggable
        key={keyProps}
        draggableId={keyProps}
        index={Number('1' + piece.posX + piece.posY)}
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
            />
            </div>
        )}
        </Draggable>
    );
}
