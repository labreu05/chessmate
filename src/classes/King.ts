import { MOVEMENT_DIAGONAL, MOVEMENT_STRAIGHT, PieceClass, PieceType } from "./Piece";

export class King extends PieceClass {
    type = PieceType.King;
    continuosMovement = false;

    get directions() {
        return [...MOVEMENT_STRAIGHT, ...MOVEMENT_DIAGONAL];
    }
}

