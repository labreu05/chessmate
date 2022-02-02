import { MOVEMENT_LEFT, MOVEMENT_RIGHT } from "../utils/constants";
import { cloneBoardState, getBoardPositionId, getCoordinateFromBoardId } from "../utils/helpers";
import { BoardState, PieceType } from "../utils/types";
import { ChessPiece } from "./ChessPiece";
import { PlaceholderChessPiece } from "./PlaceholderChessPiece";

export abstract class CastleableChessPiece extends ChessPiece {
    getMovements(boardState: BoardState): string[] {
        const movements = super.getMovements(boardState);

        if (this.atInitialPosition()) {
            [MOVEMENT_LEFT, MOVEMENT_RIGHT].forEach(direction => {
                const castlePath: string[] = [];
                const [px, py] = direction;
                let [currentX, currentY] = [this.posX + px, this.posY + py];
                let look = true                               

                do {
                    const possiblePosition = boardState?.[currentX]?.[currentY];
                    const positionId = getBoardPositionId(currentX, currentY);

                    if (possiblePosition === undefined) {
                        look = false;
                        continue;
                    } else {
                        if (possiblePosition === null) {
                            castlePath.push(positionId);
                            currentX = currentX + px;
                            currentY = currentY + py;
                            continue;
                        } else {
                            if (possiblePosition && [PieceType.King, PieceType.Rook].filter((type) => type !== this.type).includes(possiblePosition.type) && possiblePosition.atInitialPosition()) {
                                if (castlePath.length === 3) {
                                    this.type === PieceType.King ? castlePath.pop(): castlePath.shift();
                                }

                                const castleKing = [this, possiblePosition].find(piece => piece.type === PieceType.King);
                                // Include king's position to also check if its not being attacked
                                if (castleKing) {
                                    castlePath.push(getBoardPositionId(castleKing.posX, castleKing.posY));
                                }
                                
                                // Check all the opposite pieces to determine if castle is possible or not
                                if (this.canCastle(boardState, castlePath)) {
                                    movements.push(positionId);
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

    canCastle = (boardState: BoardState, castlePath: string[]) => {
        let canCastle = true;
        const currentBoard = cloneBoardState(boardState);
        const availablePieces = currentBoard.flatMap(piece => piece).filter(piece => piece !== null && piece.color !== this.color);
        const fakeBoard = cloneBoardState(currentBoard);

        castlePath.forEach(positionId => {
            const [px, py] = getCoordinateFromBoardId(positionId);
            const placeholderKing = new PlaceholderChessPiece(this.color, [px, py], PieceType.King);

            fakeBoard[px][py] = placeholderKing;
        });

        availablePieces.forEach(piece => {
            if (piece) {                
                let moves: string[];
                // This is to avoid cyclic situation while trying to get movements
                if ([PieceType.King, PieceType.Rook].includes(piece.type)) {
                    moves = Object.getPrototypeOf(piece).getMovements(this, fakeBoard)
                } else {
                    moves = piece.getMovements(fakeBoard);
                }

                castlePath.forEach((id) => {
                    if (moves?.includes(id)) {
                        canCastle = false;
                    }
                });
            }
        })

        return canCastle;
    }
}

