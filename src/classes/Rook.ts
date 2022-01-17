import { MOVEMENT_STRAIGHT, PieceClass, PieceType } from "./Piece";

export class Rook extends PieceClass {
    type = PieceType.Rook;
    continuosMovement = true;

    get directions() {
        return MOVEMENT_STRAIGHT;
    }
}

