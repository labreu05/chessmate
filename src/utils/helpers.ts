import _ from "lodash";
import {
  ChessPiece,
  Knight,
  Queen,
  Rook,
  Bishop,
  Pawn,
  King,
} from "../classes";
import { BOARD_POSITION_ID_PREFIX } from "./constants";
import { initialBoard, initialState } from "./initialData";
import { BoardState, GameState, PieceType } from "./types";

export const cloneBoardState = (boardState: BoardState) => {
  return _.cloneDeep(boardState);
};

export const getCoordinateFromBoardId = (key: string) => {
  return key
    .replace(BOARD_POSITION_ID_PREFIX, "")
    .split("-")
    .map((el) => Number(el));
};

export const getBoardPositionId = (posX: number, posY: number) => {
  return `${BOARD_POSITION_ID_PREFIX}${posX}-${posY}`;
};

export const changePieceType = (piece: ChessPiece, newType: PieceType) => {
  const { color, posX, posY, moveCount } = piece;
  let result: ChessPiece | null;

  switch (newType) {
    case PieceType.King: {
      result = new King(color, [posX, posY], moveCount);
      break;
    }
    case PieceType.Queen: {
      result = new Queen(color, [posX, posY], moveCount);
      break;
    }
    case PieceType.Rook: {
      result = new Rook(color, [posX, posY], moveCount);
      break;
    }
    case PieceType.Bishop: {
      result = new Bishop(color, [posX, posY], moveCount);
      break;
    }
    case PieceType.Knight: {
      result = new Knight(color, [posX, posY], moveCount);
      break;
    }
    case PieceType.Pawn: {
      result = new Pawn(color, [posX, posY], moveCount);
      break;
    }
    default: {
      result = null;
    }
  }

  return result;
};

export const getBoardState = (): GameState => {
  const stringState = localStorage.getItem("chessmate");
  let result = initialState;

  if (stringState) {
    const parsedState: GameState = JSON.parse(stringState);

    parsedState.boardState
      .flatMap((x) => x)
      .forEach((piece) => {
        if (piece !== null) {
          const actualPiece = changePieceType(piece, piece.type);
          if (actualPiece) {
            const { posX, posY } = actualPiece;
            if (posX !== undefined && posY !== undefined) {
              parsedState.boardState[posX][posY] = actualPiece;
            }

            piece = actualPiece;
          }
        }
      });

    result = parsedState;
  }

  return result;
};

export const saveBoardState = (state: GameState) => {
  return localStorage.setItem("chessmate", JSON.stringify(state));
};
