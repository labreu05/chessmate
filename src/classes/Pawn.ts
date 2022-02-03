import { NEGATIVE_MOVEMENT, POSITIVE_MOVEMENT } from "../utils/constants";
import { getBoardPositionId } from "../utils/helpers";
import { PieceColor, PieceType } from "../utils/types";
import { ChessPiece } from "./ChessPiece";

export class Pawn extends ChessPiece {
  type = PieceType.Pawn;
  continuosMovement = false;
  movementDirection: number;
  captureDirections: number[][];

  constructor(
    color: PieceColor,
    pos: [posX: number, posY: number],
    moveCount: number = 0
  ) {
    super(color, pos, moveCount);
    this.movementDirection =
      color === PieceColor.Black ? POSITIVE_MOVEMENT : NEGATIVE_MOVEMENT;
    this.captureDirections = [
      [this.movementDirection, -1],
      [this.movementDirection, 1],
    ];
  }

  public get directions(): number[][] {
    return [[this.movementDirection, 0]];
  }

  getMovements(boardState: (ChessPiece | null)[][]) {
    const movements: string[] = [];
    const [direction] = this.directions;
    const [px, py] = direction;
    const [currentX, currentY] = [this.posX + px, this.posY + py];
    const possiblePosition = boardState?.[currentX]?.[currentY];
    const positionId = getBoardPositionId(currentX, currentY);

    if (!possiblePosition) {
      movements.push(positionId);

      const twoStepMovement =
        boardState?.[currentX + this.movementDirection]?.[currentY];

      if (this.atInitialPosition() && !twoStepMovement) {
        movements.push(
          getBoardPositionId(currentX + this.movementDirection, currentY)
        );
      }
    }

    this.captureDirections.forEach((direction) => {
      const [px, py] = direction;
      let [currentX, currentY] = [this.posX + px, this.posY + py];

      const possiblePosition = boardState?.[currentX]?.[currentY];

      if (possiblePosition && possiblePosition?.color !== this.color) {
        movements.push(getBoardPositionId(currentX, currentY));
      }
    });

    return movements;
  }
}
