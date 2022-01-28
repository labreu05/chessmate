import { BOARD_POSITION_ID_PREFIX } from "../constants";

export enum PieceColor {
    Black = 'black',
    White = 'white'
}

export enum PieceType {
    King = 'king',
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn'
}

export const MOVEMENT_RIGHT = [0,-1];
export const MOVEMENT_LEFT = [0,1];
export const MOVEMENT_STRAIGHT = [[0,-1], [0,1], [1,0], [-1,0]];
export const MOVEMENT_DIAGONAL = [[-1,1], [1,-1], [1,1], [-1,-1]];
export const POSITIVE_MOVEMENT = 1;
export const NEGATIVE_MOVEMENT = -1;

export abstract class ChessPiece {
    color: PieceColor;
    moveCount: number = 0;
    posX: number;
    posY: number;
    abstract type: PieceType;
    abstract get directions(): number[][];
    abstract continuosMovement: boolean;
    captureDirections: number[][] = [];

    constructor(color: PieceColor, pos: [posX: number, posY: number]) {
        this.color = color;
        [this.posX, this.posY] = pos;
    }

    setPos(posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
    }

    countMove() {
        this.moveCount++;
    }

    atInitialPosition() {
        return this.moveCount === 0;
    }
 
    getMovements(boardState: (ChessPiece|null)[][]) {
        let movements: string[] = [];

        this.directions.forEach(direction => {
            let look = this.continuosMovement;                               
            const [px, py] = direction;
                let [currentX, currentY] = [this.posX + px, this.posY + py];

                do {
                    const possiblePosition = boardState?.[currentX]?.[currentY];

                    if (possiblePosition === null) {
                        movements.push(`${BOARD_POSITION_ID_PREFIX}${currentX}-${currentY}`)
                        currentX = currentX + px;
                        currentY = currentY + py;
                    } else if (possiblePosition?.color !== this.color) {
                        movements.push(`${BOARD_POSITION_ID_PREFIX}${currentX}-${currentY}`);
                        look = false;
                    } else {
                        look = false;
                    }
                } while(look);
            });

        return movements;
    }
}