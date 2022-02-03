import { ChessPiece } from "./ChessPiece";
import { MOVEMENT_DIAGONAL, MOVEMENT_STRAIGHT } from "../utils/constants";
import { PieceType } from "../utils/types";

export class Queen extends ChessPiece {
  type = PieceType.Queen;
  continuosMovement = true;

  get directions() {
    return [...MOVEMENT_STRAIGHT, ...MOVEMENT_DIAGONAL];
  }
}
