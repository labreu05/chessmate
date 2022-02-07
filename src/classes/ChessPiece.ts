import { getBoardPositionId } from "../utils/helpers";
import { BoardState, PieceColor, PieceType } from "../utils/types";

export abstract class ChessPiece {
  color: PieceColor;
  moveCount: number;
  posX: number;
  posY: number;
  abstract type: PieceType;
  abstract get directions(): number[][];
  abstract continuosMovement: boolean;
  captureDirections: number[][] = [];

  constructor(
    color: PieceColor,
    pos: [posX: number, posY: number],
    moveCount = 0
  ) {
    this.color = color;
    this.moveCount = moveCount;
    [this.posX, this.posY] = pos;
  }

  setPos(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }

  countMove() {
    this.moveCount++;
  }

  getMoveCount() {
    return this.moveCount;
  }

  atInitialPosition() {
    return this.moveCount === 0;
  }

  getMovements(boardState: BoardState) {
    let movements: string[] = [];

    this.directions.forEach((direction) => {
      const [px, py] = direction;
      let [currentX, currentY] = [this.posX + px, this.posY + py];
      let shouldLook = this.continuosMovement;

      do {
        const possiblePosition = boardState?.[currentX]?.[currentY];
        const positionId = getBoardPositionId(currentX, currentY);

        // Check if the tile is empty
        if (possiblePosition === null) {
          movements.push(positionId);
          currentX = currentX + px;
          currentY = currentY + py;
          continue;
          // Check if the tile has a opposite position
        } else if (possiblePosition?.color !== this.color) {
          // This condition is to avoid a King attacking a King
          if (
            ![this.type, possiblePosition?.type].every(
              (type) => type === PieceType.King
            )
          ) {
            movements.push(positionId);
          }

          shouldLook = false;
        } else {
          shouldLook = false;
        }
      } while (shouldLook);
    });

    return movements;
  }
}
