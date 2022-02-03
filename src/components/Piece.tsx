import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ChessPiece } from "../classes/ChessPiece";
import { PieceImage } from "./PieceImage";

type Props = {
  piece: ChessPiece;
  handleClick: (piece: ChessPiece) => void | null;
  isDragDisabled: boolean;
};

export const Piece = ({ piece, handleClick, isDragDisabled }: Props) => {
  const key = `${piece.posX}-${piece.posY}`;

  return (
    <Draggable
      key={key}
      draggableId={key}
      index={Number("1" + piece.posX + piece.posY)}
      //Keep track of the turn and disable other pieces
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <PieceImage
            piece={piece}
            handlePress={!isDragDisabled ? () => handleClick(piece) : undefined}
          />
        </div>
      )}
    </Draggable>
  );
};
