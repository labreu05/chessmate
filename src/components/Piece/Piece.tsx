import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ChessPiece } from "../../classes/ChessPiece";
import { PieceImage } from "../PieceImage/PieceImage";

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
      // TODO: Look for a way to fix this required index
      index={Number("1" + piece.posX + piece.posY)}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseDown={!isDragDisabled ? () => handleClick(piece) : undefined}
        >
          <PieceImage color={piece.color} type={piece.type} />
        </div>
      )}
    </Draggable>
  );
};
