import { CastleableChessPiece } from "./CastleableChessPiece";
import { MOVEMENT_DIAGONAL, MOVEMENT_STRAIGHT, PieceType } from "./ChessPiece";

export class King extends CastleableChessPiece {
    type = PieceType.King;
    continuosMovement = false;

    get directions() {
        return [
            ...MOVEMENT_STRAIGHT,
            ...MOVEMENT_DIAGONAL
        ];
    }
}

