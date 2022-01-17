import { PieceClass, PieceType } from "./Piece";

export class Knight extends PieceClass {
    type = PieceType.Knight;
    continuosMovement = false;

    get directions() {
        return [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [-1,2], [1,-2], [-1,-2]];
    }
}

