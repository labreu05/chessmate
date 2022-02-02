import { MOVEMENT_DIAGONAL, MOVEMENT_STRAIGHT } from "../utils/constants";
import { PieceType } from "../utils/types";
import { CastleableChessPiece } from "./CastleableChessPiece";

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

