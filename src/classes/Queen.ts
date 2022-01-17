import { MOVEMENT_DIAGONAL, MOVEMENT_STRAIGHT, PieceClass, PieceType } from "./Piece";

export class Queen extends PieceClass {
    type = PieceType.Queen;
    continuosMovement = true;

    get directions() {
        return [...MOVEMENT_STRAIGHT, ...MOVEMENT_DIAGONAL];
    }
}

