import { Modal } from "antd";
import { PlaceholderChessPiece } from "../../classes/PlaceholderChessPiece";
import { PieceColor, PieceType } from "../../utils/types";
import { PieceImage } from "../PieceImage/PieceImage";
import "./styles.scss";

type ContentProps = {
  onClick: (value: PieceType) => void;
  color: PieceColor;
};

const Content = ({ onClick, color }: ContentProps) => {
  const types = [
    PieceType.Queen,
    PieceType.Rook,
    PieceType.Bishop,
    PieceType.Knight,
  ];

  return (
    <div className="promotion-modal-content">
      {types.map((type) => {
        const piece = new PlaceholderChessPiece(color, [0, 0], type);

        return (
          <PieceImage
            key={`${type}-${color} promotion`}
            color={piece.color}
            type={piece.type}
            draggable={false}
            size="small"
            handleClick={() => onClick(type)}
          />
        );
      })}
    </div>
  );
};

export const getPromotion: (color: PieceColor) => Promise<PieceType> = async (
  color: PieceColor
) => {
  const confirmModal = Modal.info({
    visible: true,
    icon: null,
    okText: "Cancel",
    okType: "danger",
    title: "Promote Pawn to:",
  });

  return new Promise((resolve, reject) => {
    const resolveIt = (value: PieceType) => {
      resolve(value);
      confirmModal.destroy();
    };

    confirmModal.update({
      content: <Content onClick={resolveIt} color={color} />,
      onOk: () => reject(),
      onCancel: () => reject(),
    });
  });
};
