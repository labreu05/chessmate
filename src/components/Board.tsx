import React, { useState } from "react";
import { Square } from './Square';
import { Piece } from './Piece';
import { DragDropContext } from 'react-beautiful-dnd';

export interface ISubmitResult {
    "square-1": [number] | null;
    "square-2": [number] | null;
}

export const Board = () => {
    const [myState, setMyState] = useState<any>([
        [[1],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]]
    ]);
    const onDragEnd = (result: any) => {
        const { source, destination } : {source: any, destination: any} = result;
 
        if (destination && source.droppableId !== destination.droppableId) {
            const [sourceRow, sourcePosition] = source.droppableId.split('-');
            const [destinationRow, destinationPosition] = destination.droppableId.split('-');
            
            const newState: any = [
                ...myState,
            ];

            newState[destinationRow][destinationPosition] = newState[sourceRow][sourcePosition];
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
                    {row.map((square: any, squareIndex: any) =>
                        <Square id={`${rowIndex}-${squareIndex}`} key={`chess-square-${squareIndex}`}>
                            {square.length > 0 && 
                                <Piece id={'piece'} />
                            }
                        </Square>
                    )}
                </div>
            )}
        </DragDropContext>
    );
}
