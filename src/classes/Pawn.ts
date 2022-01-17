import { PieceClass, PieceColor, PieceType } from "./Piece";

export class Pawn extends PieceClass {
    type = PieceType.Pawn;
    continuosMovement = false;

    public get directions(): number[][] {
        const multVal = this.color === PieceColor.White ? -1 : 1;
        const directions = [[multVal, 0]];

        if (this.moveCount === 0) {
            directions.push([2 * multVal, 0]);
        }
        
        return directions;
    }
}

