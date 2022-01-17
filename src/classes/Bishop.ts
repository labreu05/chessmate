import { MOVEMENT_DIAGONAL, PieceClass, PieceType } from "./Piece";

export class Bishop extends PieceClass {
    type = PieceType.Bishop;
    continuosMovement = true;

    get directions() {
        return MOVEMENT_DIAGONAL;
    }
}

