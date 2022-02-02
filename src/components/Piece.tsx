import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ChessPiece } from "../classes/ChessPiece";
import { PieceImage } from "./PieceImage";

type Props = {
    piece: ChessPiece;
    handleClick: (piece: ChessPiece) => void;
}

export const Piece = ({ piece, handleClick }: Props) => {
    const keyProps = `${piece.posX}-${piece.posY}`;

    return (
        <Draggable
        key={keyProps}
        draggableId={keyProps}
        index={Number('1' + piece.posX + piece.posY)}
        //Keep track of the turn and disable other pieces
        isDragDisabled={false}
        >
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <PieceImage
                    piece={piece}
                    handlePress={() => handleClick(piece)}
                />
            </div>
        )}
        </Draggable>
    );
}
