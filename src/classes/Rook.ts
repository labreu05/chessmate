import { MOVEMENT_STRAIGHT } from "../utils/constants";
import { PieceType } from "../utils/types";
import { CastleableChessPiece } from "./CastleableChessPiece";

export default class Rook extends CastleableChessPiece {
  type = PieceType.Rook;
  continuosMovement = true;

  get directions() {
    return MOVEMENT_STRAIGHT;
  }
}
