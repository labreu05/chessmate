import { PieceColor, PieceType } from "../utils/types";
import { ChessPiece } from "./ChessPiece";

export class PlaceholderChessPiece extends ChessPiece {
    type: PieceType;
    get directions(): number[][] {
        return [];
    }
    continuosMovement: boolean = false;

    constructor(color: PieceColor, pos: [posX: number, posY: number], type: PieceType) {
        super(color, pos);
        this.type = type;
    }
}

