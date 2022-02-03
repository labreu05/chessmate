import { MOVEMENT_DIAGONAL } from "../utils/constants";
import { PieceType } from "../utils/types";
import { ChessPiece } from "./ChessPiece";

export class Bishop extends ChessPiece {
  type = PieceType.Bishop;
  continuosMovement = true;

  get directions() {
    return MOVEMENT_DIAGONAL;
  }
}
