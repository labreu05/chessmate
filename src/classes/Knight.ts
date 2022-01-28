import { ChessPiece, PieceType } from "./ChessPiece";

export class Knight extends ChessPiece {
    type = PieceType.Knight;
    continuosMovement = false;

    get directions() {
        return [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [-1,2], [1,-2], [-1,-2]];
    }
}

