import { BOARD_POSITION_ID_PREFIX } from "../constants";
import { ChessPiece, NEGATIVE_MOVEMENT, PieceColor, PieceType, POSITIVE_MOVEMENT } from "./ChessPiece";

export class Pawn extends ChessPiece {
    type = PieceType.Pawn;
    continuosMovement = false;
    movementDirection: number;
    captureDirections: number[][];
    
    constructor(color: PieceColor, pos: [posX: number, posY: number]) {
        super(color, pos);
        this.movementDirection = color === PieceColor.Black ? POSITIVE_MOVEMENT : NEGATIVE_MOVEMENT;
        this.captureDirections = [[this.movementDirection, -1], [this.movementDirection, 1]]
    }

    public get directions(): number[][] {
        return [[this.movementDirection, 0]];
    }
    

    getMovements(boardState: (ChessPiece|null)[][]) {
        const movements: string[] = [];
        const [ direction ] = this.directions;
        const [px, py] = direction;
        const [currentX, currentY] = [this.posX + px, this.posY + py];
        const possiblePosition = boardState?.[currentX]?.[currentY];

        if (!possiblePosition) {
            movements.push(`${BOARD_POSITION_ID_PREFIX}${currentX}-${currentY}`)

            const twoStepMovement = boardState?.[currentX + (this.movementDirection)]?.[currentY];

            if (this.moveCount === 0 && !twoStepMovement) {
                movements.push(`${BOARD_POSITION_ID_PREFIX}${currentX + (this.movementDirection)}-${currentY}`)
            }
        }

        this.captureDirections.forEach(direction => {                             
            const [px, py] = direction;
            let [currentX, currentY] = [this.posX + px, this.posY + py];

            const possiblePosition = boardState?.[currentX]?.[currentY];

            if (possiblePosition && possiblePosition?.color !== this.color) {
                movements.push(`${BOARD_POSITION_ID_PREFIX}${currentX}-${currentY}`);   
            }             
        });


        return movements;
    }
}

