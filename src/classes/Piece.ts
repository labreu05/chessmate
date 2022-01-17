export enum PieceColor {
    Black = 'black', White = 'white'
}

export enum PieceType {
    King = 'king',
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn'
}

export const MOVEMENT_STRAIGHT = [[1,0], [0,1], [-1,0], [0,-1]];
export const MOVEMENT_DIAGONAL = [[-1,1], [1,-1], [1,1], [-1,-1]];

export abstract class PieceClass {
    color: PieceColor;
    moveCount: number = 0;
    posX: number;
    posY: number;
    abstract type: PieceType;
    abstract get directions(): number[][];
    abstract continuosMovement: boolean;
    // abstract directions2: number[][];

    constructor(color: PieceColor, pos: [posX: number, posY: number]) {
        // this.type = type;
        this.color = color;
        this.posX = pos[0];
        this.posY = pos[1];
    }

    setPos(posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
    }

    countMove() {
        this.moveCount++;
    }

    getMovements(boardState: (PieceClass|null)[][]) {
        let movements: string[] = [];

        this.directions.forEach(direction => {
            let look = this.continuosMovement;                               
            const [px, py] = direction;
                let [currentX, currentY] = [this.posX + px, this.posY + py];
                
                // while(look) {
                //     const possiblePosition = boardState?.[currentX]?.[currentY];
                    
                //         if (possiblePosition === null) {
                //             movements.push(`chess-square-${currentX}-${currentY}`)
                //             currentX = currentX + px;
                //             currentY = currentY + py;
                //         }
                //         else {
                //         look = false;
                //     }
                // }

                do {
                    const possiblePosition = boardState?.[currentX]?.[currentY];

                    if (possiblePosition === null) {
                        movements.push(`chess-square-${currentX}-${currentY}`)
                        currentX = currentX + px;
                        currentY = currentY + py;
                    } else {
                        look = false;
                    }
                } while(look);
            });

        return movements;
    }
}