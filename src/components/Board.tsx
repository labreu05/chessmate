import React, { useEffect, useState } from "react";
import { Square } from './Square';
import { Piece } from './Piece';
import { DragDropContext } from 'react-beautiful-dnd';
import { ChessPiece, PieceType } from "../classes/ChessPiece";
import { initialBoard } from "./initialData";
import { CastleableChessPiece } from "../classes/CastleableChessPiece";
import { BOARD_POSITION_ID_PREFIX } from "../constants";

const getCoordinateFromKey = (key: string) => {
    return key.replace(BOARD_POSITION_ID_PREFIX, '').split('-').map((el) => Number(el));
}

export const Board = () => {
    const [boardState, setBoardState] = useState<(ChessPiece|null)[][]>(initialBoard);
    const [selectedPiece, setSelectedPiece] = useState<ChessPiece|null>(null);
    const [validMoves, setValidMoves] = useState<string[]>([]);

    useEffect(()=> {
        if (selectedPiece) {
            setValidMoves(selectedPiece.getMovements(boardState));
        };
    }, [boardState, selectedPiece])
    
    const onDragEnd = (result: any) => {
        const { source, destination } : {source: any, destination: any} = result;
 
        if (destination && source.droppableId !== destination.droppableId) {
            const [sourceX, sourceY] = getCoordinateFromKey(source.droppableId);
            const [destinationX, destinationY] = getCoordinateFromKey(destination.droppableId);

            //TODO: Deep clone state 
            const boardClone = [
                ...boardState
            ];
            const targetPiece = boardClone[sourceX][sourceY];
            const sourcePiece = boardClone[destinationX][destinationY];
            
            if (targetPiece) {
                if (targetPiece instanceof CastleableChessPiece && targetPiece.atInitialPosition() && sourcePiece && sourcePiece instanceof CastleableChessPiece) {
                    // console.log(targetPiece, targetPiece instanceof CastleableChessPiece);
                    // if (sourcePiece && sourcePiece instanceof CastleableChessPiece) {
                        const targetKing = [sourcePiece, targetPiece].find((piece) => piece.type === PieceType.King);
                        const targetRook = [sourcePiece, targetPiece].find((piece) => piece.type === PieceType.Rook);

                        if (targetKing && targetRook) {
                            const rrr = targetKing.posY > targetRook.posY ? -1 : 1;
                            const newKingY = targetKing?.posY + (2 * rrr) ; // or - 2
                            const newRookY = newKingY - (1 * rrr); // or + 1

                            // move king 2 spaces
                            boardClone[targetKing.posX][targetKing.posY] = null;
                            targetKing.setPos(targetKing.posX, newKingY);
                            targetKing.countMove();
                            boardClone[targetKing.posX][newKingY] = targetKing;

                            boardClone[targetRook.posX][targetRook.posY] = null;
                            targetRook.setPos(targetRook.posX, newRookY);
                            boardClone[targetRook.posX][newRookY] = targetRook;

                            // targetRook
                            
                            // sourcePiece.posY = sourcePiece.posY + 2;
                            // targetPiece.posY = targetPiece.posY - 2;
    
                            // boardClone[destinationX][destinationY] = targetPiece;
                            // boardClone[sourceX][sourceY] = null;
                        }

                    // }
                    // ADD CASTLE CODE
                } else {
                    // ADD PROMOTE CODE
                    // TODO: Do this once the movement is secured
                    
                    boardClone[destinationX][destinationY] = targetPiece;
                    boardClone[sourceX][sourceY] = null;
                    targetPiece.countMove();
                    targetPiece.setPos(destinationX, destinationY);
        
                    boardClone[destinationX][destinationY] = targetPiece;
                    boardClone[sourceX][sourceY] = null;

                }
    
                setSelectedPiece(null);
                setValidMoves([]);
                setBoardState(boardClone);
            }

        }

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {boardState.map((row: any, rowIndex: any) => 
                <div className="chess-row" key={`chess-row-${rowIndex}`}>
                    {row.map((square: ChessPiece, squareIndex: any) => {
                        const squareId = `${BOARD_POSITION_ID_PREFIX}${rowIndex}-${squareIndex}`;
                        const canMove = validMoves.includes(squareId);
                        const canAttack = canMove && square && square?.color !== selectedPiece?.color;

                        return <Square id={squareId} key={squareId} canMove={canMove} canKill={canAttack}>
                            {square
                                ? <Piece piece={square} posX={rowIndex} posY={squareIndex} handleClick={(piece: ChessPiece) => {setSelectedPiece(piece)}} /> 
                                : null
                            }
                        </Square>
                    })}
                </div>
            )}
        </DragDropContext>
    );
}
