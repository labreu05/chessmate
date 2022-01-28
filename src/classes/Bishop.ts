import { MOVEMENT_DIAGONAL, ChessPiece, PieceType } from "./ChessPiece";

export class Bishop extends ChessPiece {
    type = PieceType.Bishop;
    continuosMovement = true;

    get directions() {
        return MOVEMENT_DIAGONAL;
    }
}

