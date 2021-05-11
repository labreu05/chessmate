import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const Piece = (props: any) => {
    return (
        <Draggable
        key={"piece-id"}
        draggableId={"asdasd"}
        index={0}
        >
        {(provided, snapshot) => (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
            <img
                alt="asdasdasdas dasd as d"
                id={props.id}
                src="https://cdn3.iconfinder.com/data/icons/glypho-social-and-other-logos/64/logo-facebook-512.png"
                draggable="true"
                width="70px"
                height="70px"
                style={{cursor: 'pointer'}}
            />
            </div>
        )}
        </Draggable>
    );
}
