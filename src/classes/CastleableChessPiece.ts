import { BOARD_POSITION_ID_PREFIX } from "../constants";
import { ChessPiece, MOVEMENT_LEFT, MOVEMENT_RIGHT, PieceType } from "./ChessPiece";
import { Pawn } from "./Pawn";

export abstract class CastleableChessPiece extends ChessPiece {
    getMovements(boardState: (ChessPiece | null)[][]): string[] {
        const movements = super.getMovements(boardState);

        if (this.moveCount === 0) {
            [MOVEMENT_LEFT, MOVEMENT_RIGHT].forEach(direction => {
                let look = true                               
                const [px, py] = direction;
                let [currentX, currentY] = [this.posX + px, this.posY + py];
                const castlePath: string[] = [];

                do {
                    const possiblePosition = boardState?.[currentX]?.[currentY];
                    if (possiblePosition === undefined) {
                        look = false;
                        continue;
                    } else {
                        if (possiblePosition === null) {
                            castlePath.push(`${BOARD_POSITION_ID_PREFIX}${currentX}-${currentY}`);
                            currentX = currentX + px;
                            currentY = currentY + py;
                            // KEEP TRACK OF THE MOVEMENTS 
                            continue;
                        } else {
                            if (possiblePosition && [PieceType.King, PieceType.Rook].filter((type) => type !== this.type).includes(possiblePosition.type) && possiblePosition.atInitialPosition()) {
                                // Check all the opposite pieces to determine if castle is possible or not
                                if (possiblePosition.type === PieceType.King){
                                    if (castlePath.length === 3) {
                                        castlePath[0] = `${BOARD_POSITION_ID_PREFIX}${possiblePosition.posX}-${possiblePosition.posY}`;
                                    } else {
                                        castlePath.push(`${BOARD_POSITION_ID_PREFIX}${possiblePosition.posX}-${possiblePosition.posY}`);
                                    }
                                }

                                // Include king's position to also check if its not being attacked
                                if (this.type === PieceType.King) {
                                    castlePath.push(`${BOARD_POSITION_ID_PREFIX}${this.posX}-${this.posY}`);
                                }

                                if (this.canCastle(boardState, castlePath)) {
                                    movements.push(`${BOARD_POSITION_ID_PREFIX}${currentX}-${currentY}`)
                                }

                                look = false;
                            } else {
                                look = false;
                            }
                        }
                    }

                    } while(look);
                });            
        }

        return movements;
    }

 canCastle = (boardState: (ChessPiece | null)[][], castlePath: string[]) => {
    let canCastle = true;
    let baseBoard = [...boardState];

    baseBoard[0] = [...baseBoard[0]];
    baseBoard[1] = [...baseBoard[1]];
    baseBoard[2] = [...baseBoard[2]];
    baseBoard[3] = [...baseBoard[3]];
    baseBoard[4] = [...baseBoard[4]];
    baseBoard[5] = [...baseBoard[5]];
    baseBoard[6] = [...baseBoard[6]];
    baseBoard[7] = [...baseBoard[7]];

    // Check -> FlatMap
    baseBoard.forEach(row => {
        row.forEach(piece => {
            if (piece && piece?.color !== this.color) {                
                // console.log('PATH', castlePath);
                const newBoard = [...baseBoard];
                castlePath.forEach((id) => {
                    const [px, py] = getCoordinate(id);
                    newBoard[px][py]= new Pawn(this.color, [px,py]);
                });

                let moves: string[];
                if ([PieceType.King, PieceType.Rook].includes(piece.type)) {
                    // This is to avoid cyclic situation while trying to get movements
                    moves = Object.getPrototypeOf(piece).getMovements(this, newBoard)
                } else {
                    moves = piece.getMovements(newBoard);
                }

                // if (piece.type === PieceType.Knight) {
                //     console.log(newBoard);
                //     console.log('<---------->');
                //     // console.log(moves, id)
                // }

                castlePath.forEach((id) => {
                    if (moves?.includes(id)) {
                        canCastle = false;
                    }
                });
            }
        })
    });

    return canCastle;
}
}

const getCoordinate = (id: string): number[] => {
   const result = id.replace(BOARD_POSITION_ID_PREFIX, '').split('-');
   return [Number(result[0]), Number(result[1])];
}
