import _ from "lodash";
import { Bishop } from "../classes/Bishop";
import { ChessPiece } from "../classes/ChessPiece";
import { Knight } from "../classes/Knight";
import { Pawn } from "../classes/Pawn";
import { Queen } from "../classes/Queen";
import { Rook } from "../classes/Rook";
import { BOARD_POSITION_ID_PREFIX } from "./constants";
import { BoardState, PieceType } from "./types";

export const cloneBoardState = (boardState: BoardState) => {
    return _.cloneDeep(boardState);
}

export const getCoordinateFromBoardId = (key: string) => {
    return key.replace(BOARD_POSITION_ID_PREFIX, '').split('-').map((el) => Number(el));
}

export const getBoardPositionId = (posX: number, posY: number) => {
    return `${BOARD_POSITION_ID_PREFIX}${posX}-${posY}`;
}

export const changePieceType = (piece: ChessPiece, newType: PieceType) => {
    let result: ChessPiece | null = null;
    const { color, posX, posY } = piece;
    const moveCount = piece.getMoveCount();

    switch(newType) {
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
    }

    return result;
}