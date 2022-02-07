import classnames from "classnames";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "./styles.scss";

type Props = {
  id: string;
  canMove: boolean;
  underAttack: boolean;
  children: JSX.Element | null;
};

export const Square = ({ id, canMove, underAttack, children }: Props) => {
  return (
    <Droppable droppableId={id} isDropDisabled={!canMove}>
      {(provided, snapshot) => (
        <div
          className={classnames("chess-square", {
            "under-attack": underAttack,
            "can-move": !underAttack && canMove,
            "dragging-over": snapshot.isDraggingOver,
          })}
          ref={provided.innerRef}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
