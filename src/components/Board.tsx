import React, { useState } from "react";
import { Square } from './Square';
import { Piece, PieceProps, testPiece1, testPiece2 } from './Piece';
import { DragDropContext } from 'react-beautiful-dnd';

export interface ISubmitResult {
    "square-1": [number] | null;
    "square-2": [number] | null;
}


export const Board = () => {
    const [myState, setMyState] = useState<any>([
        [[testPiece1],[testPiece2],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]]
    ]);

    // console.log(myState);
    const onDragEnd = (result: any) => {
        const { source, destination } : {source: any, destination: any} = result;
 
        if (destination && source.droppableId !== destination.droppableId) {
            const [sourceRow, sourcePosition] = source.droppableId.split('-');
            const [destinationRow, destinationPosition] = destination.droppableId.split('-');

            
            const newState: any = [
                ...myState,
            ];

            const targetPiece = newState[sourceRow][sourcePosition];

            // TODO: Do this once the movement is secured
            targetPiece[0].moveCount ++;
            targetPiece[0].posX = destinationRow;
            targetPiece[0].posY = destinationPosition;

            newState[destinationRow][destinationPosition] = targetPiece;
            newState[sourceRow][sourcePosition] = [];
    
            setMyState(newState);
    
            console.log(result);
        }

    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            {myState.map((row: any, rowIndex: any) => 
                <div className="chess-row" key={`chess-row-${rowIndex}`}>
                    {row.map((square: Array<PieceProps>, squareIndex: any) =>
                        <Square id={`${rowIndex}-${squareIndex}`} key={`chess-square-${squareIndex}`}>
                            {square.length > 0 && 
                                <Piece piece={square[0]} />
                            }
                        </Square>
                    )}
                </div>
            )}
        </DragDropContext>
    );
}
