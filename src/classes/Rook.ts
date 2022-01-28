import { CastleableChessPiece } from "./CastleableChessPiece";
import { MOVEMENT_STRAIGHT, ChessPiece, PieceType, MOVEMENT_LEFT, MOVEMENT_RIGHT } from "./ChessPiece";

export class Rook extends CastleableChessPiece {
    type = PieceType.Rook;
    continuosMovement = true;

    get directions() {
        return MOVEMENT_STRAIGHT;
    }
}
