import React, { useEffect, useState } from "react";
import { Square } from './Square';
import { Piece } from './Piece';
import { DragDropContext } from 'react-beautiful-dnd';
import { PieceClass, PieceColor, PieceType } from "../classes/Piece";
import { initialBoard } from "./initialData";

export const Board = () => {
    // TODO: change this and have null | PieceClass instead of array 
    const [myState, setMyState] = useState<(PieceClass|null)[][]>(initialBoard || [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null] 
    ]);

    const [selectedPiece, setSelectedPiece] = useState<PieceClass|null>(null);
    const [validMoves, setValidMoves] = useState<string[]>([]);

    useEffect(()=> {
        if (selectedPiece) {
            const getValidMoves = (piece: PieceClass) => {
                let movements = [];
                
                switch(piece.type) {
                    case PieceType.Pawn: {
                        const multVal = piece.color === PieceColor.White ? -1 : 1;
                        let [currentX, currentY] = [piece.posX + multVal, piece.posY];
                        const oneStepMovement = myState?.[currentX]?.[currentY];

                        if (oneStepMovement === null) {
                            movements.push(`chess-square-${currentX}-${currentY}`);
                            
                            if (piece.moveCount === 0) {
                                [currentX, currentY] = [piece.posX + (2 * multVal), piece.posY];
                                const twoStepMovement = myState?.[currentX]?.[currentY];
    
                                if (twoStepMovement === null) {
                                    movements.push(`chess-square-${currentX}-${currentY}`);
                                }
                            }
                        }


                        break;
                    }
                    case PieceType.Rook: {
                        const directions = [[1,0], [0,1], [-1,0], [0,-1]];

                        directions.forEach(direction => {     
                            let look = true;                               
                            const [px, py] = direction;
                                let [currentX, currentY] = [piece.posX + px, piece.posY + py];
                                while(look) {
                                    const possiblePosition = myState?.[currentX]?.[currentY];
                                    
                                        if (possiblePosition === null) {
                                            movements.push(`chess-square-${currentX}-${currentY}`)
                                            currentX = currentX + px;
                                            currentY = currentY + py;
                                        }
                                        else {
                                        look = false;
                                    }
                                }
                            });

                        break;
                    }
                    case PieceType.Bishop: {
                        const directions = [[-1,1], [1,-1], [1,1], [-1,-1]];


                            directions.forEach(direction => {     
                                let look = true;                               
                                const [px, py] = direction;
                                    let [currentX, currentY] = [piece.posX + px, piece.posY + py];
                                    while(look) {
                                        const possiblePosition = myState?.[currentX]?.[currentY];
                                        
                                            if (possiblePosition === null) {
                                                // console.log(myState?.[currentX +]?.[currentY + py]);
                                                movements.push(`chess-square-${currentX}-${currentY}`)
                                                currentX = currentX + px;
                                                currentY = currentY + py;
                                            }
                                            else {
                                            look = false;
                                        }
                                    }
                                });

                        break;
                    }
                    case PieceType.Knight: {
                        const directions = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [-1,2], [1,-2], [-1,-2]];
                        
                            directions.forEach(direction => {                                    
                                const [px, py] = direction;
                                let [currentX, currentY] = [piece.posX + px, piece.posY + py];
                                const possiblePosition = myState?.[currentX]?.[currentY];
                                
                                    if (possiblePosition === null) {
                                        movements.push(`chess-square-${currentX}-${currentY}`)
                                    }
                            });

                        break;
                    }
                    case PieceType.King: {
                        const directions = [[1,0], [0,1], [-1,0], [0,-1],[-1,1], [1,-1], [1,1], [-1,-1] ];

                        directions.forEach(direction => {                                    
                            const [px, py] = direction;
                                let [currentX, currentY] = [piece.posX + px, piece.posY + py];
                                const possiblePosition = myState?.[currentX]?.[currentY];
                                
                                if (possiblePosition === null) {
                                    movements.push(`chess-square-${currentX}-${currentY}`)
                                }
                            });

                        break;
                    }
                }
        
                return movements;
        };
            if (selectedPiece) {
                setValidMoves(selectedPiece.getMovements(myState));
            }
            // const myValid = getValidMoves(selectedPiece);
        };
    }, [myState, selectedPiece])
    
    const onDragEnd = (result: any) => {
        const { source, destination } : {source: any, destination: any} = result;
 
        if (destination && source.droppableId !== destination.droppableId) {
            const [sourceRow, sourcePosition] = source.droppableId.split('-');

            let [destinationRow, destinationPosition] = destination.droppableId.split('-');
            destinationRow = Number(destinationRow);
            destinationPosition = Number(destinationPosition);

            
            const newState: any = [
                ...myState,
            ];

            const targetPiece = newState[sourceRow][sourcePosition];

            // TODO: Do this once the movement is secured
            targetPiece.moveCount++;
            targetPiece.posX = destinationRow;
            targetPiece.posY = destinationPosition;

            newState[destinationRow][destinationPosition] = targetPiece;
            newState[sourceRow][sourcePosition] = null;
    
            setSelectedPiece(null);
            setValidMoves([]);
            setMyState(newState);
        }

    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            // onDragStart={() => { setSelectedPiece(selectedPiece)}}
            // onBeforeDragStart={() => { setSelectedPiece(selectedPiece)}}
            // onBeforeCapture={() => { setSelectedPiece(selectedPiece)}}
            // onDragUpdate={() => { console.log('UPDATE 4')}}
        > 
            {myState.map((row: any, rowIndex: any) => 
                <div className="chess-row" key={`chess-row-${rowIndex}`}>
                    {row.map((square: PieceClass, squareIndex: any) => {
                        const squareId = `chess-square-${rowIndex}-${squareIndex}`;
                        return <Square id={`${rowIndex}-${squareIndex}`} key={squareId} canMove={validMoves.includes(squareId)}>
                            {/* valid move -> rgb(0 255 0) 0px 0px 18px 5px */}
                            {/* Kill -> rgb(255 0 0) 0px 0px 18px 5px */}
                            {square ?
                                <Piece piece={square} posX={rowIndex} posY={squareIndex} handleClick={(piece: PieceClass) => {setSelectedPiece(piece)}} /> : null
                            }
                        </Square>
                    }
                    )}
                </div>
            )}
        </DragDropContext>
    );
}
