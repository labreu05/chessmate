import { MOVEMENT_DIAGONAL, MOVEMENT_STRAIGHT, ChessPiece, PieceType } from "./ChessPiece";

export class Queen extends ChessPiece {
    type = PieceType.Queen;
    continuosMovement = true;

    get directions() {
        return [...MOVEMENT_STRAIGHT, ...MOVEMENT_DIAGONAL];
    }
}

