import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { DraggableLocation } from "react-beautiful-dnd";
import { CastleableChessPiece } from "../../classes/CastleableChessPiece";
import { ChessPiece } from "../../classes/ChessPiece";
import { NEGATIVE_MOVEMENT, POSITIVE_MOVEMENT } from "../../utils/constants";
import {
  changePieceType,
  cloneBoardState,
  getBoardPositionId,
  getBoardState,
  getCoordinateFromBoardId,
  saveBoardState,
} from "../../utils/helpers";
import { initialState } from "../../utils/initialData";
import { GameState, PieceColor, PieceType } from "../../utils/types";
import { GameContainer } from "../GameContainer/GameContainer";
import { getPromotion } from "../PawnPromotionModal/PawnPromotionModal";
import { Piece } from "../Piece/Piece";
import { Square } from "../Square/Square";
import "./styles.scss";

export const Board = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);

  useEffect(() => {
    setGameState(getBoardState());
  }, []);

  useEffect(() => {
    if (selectedPiece) {
      setValidMoves(selectedPiece.getMovements(gameState.boardState));
    }
  }, [gameState.boardState, selectedPiece]);

  // TODO: Add effect to update what is saved at local storage
  useEffect(() => {
    saveBoardState(gameState);
  }, [gameState]);

  const reset = () => {
    setGameState(initialState);
    setSelectedPiece(null);
    setValidMoves([]);
  };

  const onDragEnd = async (result: {
    source: DraggableLocation;
    destination?: DraggableLocation;
  }) => {
    const { source, destination } = result;
    let updateBoard = true;
    let takenPiece: ChessPiece | null = null;

    if (destination && source.droppableId !== destination.droppableId) {
      const [sourceX, sourceY] = getCoordinateFromBoardId(source.droppableId);
      const [destinationX, destinationY] = getCoordinateFromBoardId(
        destination.droppableId
      );

      const boardClone = cloneBoardState(gameState.boardState);
      let targetPiece = boardClone[sourceX][sourceY];
      const sourcePiece = boardClone[destinationX][destinationY];

      if (targetPiece) {
        // Add code to determine draw
        // Add code to win a match
        // Code to promote a pawn
        if (
          targetPiece?.type === PieceType.Pawn &&
          [0, 7].includes(destinationX)
        ) {
          try {
            const result = await getPromotion(targetPiece.color);
            const newPiece = changePieceType(targetPiece, result);
            targetPiece = newPiece;
          } catch (e) {
            updateBoard = false;
          }
        }

        // Code to Castle
        if (
          targetPiece instanceof CastleableChessPiece &&
          targetPiece.atInitialPosition() &&
          sourcePiece &&
          sourcePiece instanceof CastleableChessPiece
        ) {
          const targetKing = [sourcePiece, targetPiece].find(
            (piece) => piece.type === PieceType.King
          );
          const targetRook = [sourcePiece, targetPiece].find(
            (piece) => piece.type === PieceType.Rook
          );

          if (targetKing && targetRook) {
            const direction =
              targetKing.posY > targetRook.posY
                ? NEGATIVE_MOVEMENT
                : POSITIVE_MOVEMENT;
            const newKingY = targetKing?.posY + 2 * direction;
            const newRookY = newKingY - 1 * direction;

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
          //Code to move a piece
          if (boardClone[destinationX][destinationY]) {
            takenPiece = boardClone[destinationX][destinationY];
          }

          boardClone[destinationX][destinationY] = targetPiece;
          boardClone[sourceX][sourceY] = null;
          targetPiece?.countMove();
          targetPiece?.setPos(destinationX, destinationY);

          boardClone[destinationX][destinationY] = targetPiece;
          boardClone[sourceX][sourceY] = null;
        }

        if (updateBoard && selectedPiece) {
          let newGameState = cloneDeep(gameState);

          newGameState = {
            ...newGameState,
            boardState: boardClone,
            black: cloneDeep(gameState.black),
            white: cloneDeep(gameState.white),
          };

          newGameState[selectedPiece?.color].moves =
            newGameState[selectedPiece?.color].moves + 1;
          if (takenPiece) {
            newGameState[selectedPiece?.color].piecesTaken[takenPiece.type] =
              newGameState[selectedPiece?.color].piecesTaken[takenPiece.type] +
              1;
          }

          if (takenPiece?.type === PieceType.King) {
          }

          newGameState.turn =
            selectedPiece?.color === PieceColor.White
              ? PieceColor.Black
              : PieceColor.White;

          setSelectedPiece(null);
          setValidMoves([]);
          setGameState(newGameState);
        }
      }
    }
  };

  return (
    <GameContainer state={gameState}>
      <DragDropContext onDragEnd={onDragEnd}>
        {gameState.boardState.map((row, rowIndex) => (
          <div className="chess-row" key={`chess-row-${rowIndex}`}>
            {row.map((square, squareIndex) => {
              const squareId = getBoardPositionId(rowIndex, squareIndex);
              const canMove = validMoves.includes(squareId);
              const canAttack =
                canMove &&
                square !== null &&
                square?.color !== selectedPiece?.color;
              const canBeDragged = square?.color !== gameState.turn;

              return (
                <Square
                  id={squareId}
                  key={squareId}
                  canMove={canMove}
                  underAttack={canAttack}
                >
                  {square ? (
                    <Piece
                      piece={square}
                      handleClick={(piece: ChessPiece) => {
                        setSelectedPiece(piece);
                      }}
                      isDragDisabled={canBeDragged}
                    />
                  ) : null}
                </Square>
              );
            })}
          </div>
        ))}
        <button
          onClick={() => {
            reset();
          }}
          title="PRess mee"
        >
          RESET
        </button>
      </DragDropContext>
    </GameContainer>
  );
};
