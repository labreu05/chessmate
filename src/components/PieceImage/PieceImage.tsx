import classnames from "classnames";
import { ChessPiece } from "../../classes/ChessPiece";
// import { ChessPiece } from "../../classes";
import { PieceColor, PieceType } from "../../utils/types";
import "./styles.scss";

type Props = {
  color: PieceColor;
  type: PieceType;
  draggable?: boolean;
  handlePress?: (piece: ChessPiece) => void;
  handleClick?: () => void;
  size?: "small" | "medium";
};

export const PieceImage = ({
  color,
  type,
  handleClick,
  draggable = true,
  size = "medium",
}: Props) => {
  return (
    <img
      className={classnames("piece-image", size, {
        inverted: color === PieceColor.White,
      })}
      alt={`${color} ${type}`}
      src={`${type}.png`}
      draggable={draggable}
      onClick={handleClick}
    />
  );
};
