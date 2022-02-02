import React, { useEffect, useState } from "react";
import { Square } from './Square';
import { Piece } from './Piece';
import { DragDropContext } from 'react-beautiful-dnd';
import { ChessPiece } from "../classes/ChessPiece";
import { initialBoard } from "./initialData";
import { CastleableChessPiece } from "../classes/CastleableChessPiece";
import { NEGATIVE_MOVEMENT, POSITIVE_MOVEMENT } from "../utils/constants";
import { changePieceType, cloneBoardState, getBoardPositionId, getCoordinateFromBoardId } from "../utils/helpers";
import { PieceColor, PieceType } from "../utils/types";
import { DraggableLocation } from 'react-beautiful-dnd'
import { getPromotion } from "./PawnPromotionModal";
import { Modal } from "antd";
// import Modal from "antd/lib/modal/Modal";
// import { modalGlobalConfig } from "antd/lib/modal/confirm";

export const Board = () => {
    const [boardState, setBoardState] = useState<(ChessPiece|null)[][]>(initialBoard);
    const [selectedPiece, setSelectedPiece] = useState<ChessPiece|null>(null);
    const [validMoves, setValidMoves] = useState<string[]>([]);
    const [resolve, setResolve] = useState<(value: unknown) => void | null>();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(()=> {
        if (selectedPiece) {
            setValidMoves(selectedPiece.getMovements(boardState));
        };
    }, [boardState, selectedPiece])
    
    // TODO: Add types
    const onDragEnd = async (result: { source:DraggableLocation, destination?: DraggableLocation }) => {
        const { source, destination } = result;
        let updateBoard = true;

        // const info = Modal.as({});

        // const testPromise = new Promise((resolve, reject)=> {
        //     // Modal
        //     // info.
        //     // setResolve(resolve);
        //     const test = Modal.confirm({
        //         content: 'ok',
        //         onOk:() => {resolve('d')},
        //     onCancel: () => {reject();}});
        // });

        // const test = Modal.confirm({content});
 
        if (destination && source.droppableId !== destination.droppableId) {
            const [sourceX, sourceY] = getCoordinateFromBoardId(source.droppableId);
            const [destinationX, destinationY] = getCoordinateFromBoardId(destination.droppableId);

            //TODO: Deep clone state 
            const boardClone = cloneBoardState(boardState);
            let targetPiece = boardClone[sourceX][sourceY];
            const sourcePiece = boardClone[destinationX][destinationY];

            console.log(destinationX, sourcePiece?.type);
            
            if (targetPiece) {
                if (targetPiece?.type === PieceType.Pawn && [0, 7].includes(destinationX)) {
                    // console.log('PROMOTE PAWN')
                    // await testPromise
                    // targetPiece.type = PieceType.Queen;
                    // if (targetPiece !== null) {
                        // console.log(targetPiece);
                        try {
                            // const targetPiece = boardClone[sourceX][sourceY];
                            // console.log('1');
                            const result = await getPromotion(targetPiece.color);
                            const newPiece = changePieceType(targetPiece, result);
                            targetPiece = newPiece;
                            // console.log(result, '2');
                        } catch(e) {
                            updateBoard = false;
                        }

                    // }
                    // OPEN THE MODAL
                    // RETURN THE NEW TYPE
                    // MAKE THE NEW INSTANCE
                }
                if (targetPiece instanceof CastleableChessPiece && targetPiece.atInitialPosition() && sourcePiece && sourcePiece instanceof CastleableChessPiece) {
                    const targetKing = [sourcePiece, targetPiece].find((piece) => piece.type === PieceType.King);
                    const targetRook = [sourcePiece, targetPiece].find((piece) => piece.type === PieceType.Rook);

                    if (targetKing && targetRook) {
                        const direction = targetKing.posY > targetRook.posY ? NEGATIVE_MOVEMENT : POSITIVE_MOVEMENT;
                        const newKingY = targetKing?.posY + (2 * direction) ;
                        const newRookY = newKingY - (1 * direction);

                        // move king 2 spaces
                        boardClone[targetKing.posX][targetKing.posY] = null;
                        targetKing.setPos(targetKing.posX, newKingY);
                        targetKing.countMove();
                        boardClone[targetKing.posX][newKingY] = targetKing;
                        // Put rook next to king
                        boardClone[targetRook.posX][targetRook.posY] = null;
                        targetRook.setPos(targetRook.posX, newRookY);
                        boardClone[targetRook.posX][newRookY] = targetRook;
                    }
                } else {
                    // ADD PROMOTE CODE
                    // TODO: Do this once the movement is secured
                    boardClone[destinationX][destinationY] = targetPiece;
                    boardClone[sourceX][sourceY] = null;
                    targetPiece?.countMove();
                    targetPiece?.setPos(destinationX, destinationY);
        
                    boardClone[destinationX][destinationY] = targetPiece;
                    boardClone[sourceX][sourceY] = null;

                }
    
                if (updateBoard) {
                    setSelectedPiece(null);
                    setValidMoves([]);
                    setBoardState(boardClone);
                }
            }

        }

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {boardState.map((row, rowIndex) => 
                <div className="chess-row" key={`chess-row-${rowIndex}`}>
                    {row.map((square, squareIndex) => {
                        const squareId = getBoardPositionId(rowIndex, squareIndex);
                        const canMove = validMoves.includes(squareId);
                        const canAttack = canMove && square !== null && square?.color !== selectedPiece?.color;

                        return <Square id={squareId} key={squareId} canMove={canMove} underAttack={canAttack}>
                            {square
                                ? <Piece piece={square} handleClick={(piece: ChessPiece) => {setSelectedPiece(piece)}} /> 
                                : null
                            }
                        </Square>
                    })}
                </div>
            )}
            {/* <PawnPromotionModal showModal={showModal} /> */}
            {/* <Modal visible={modalVisible} /> */}
        </DragDropContext>
    );
}
