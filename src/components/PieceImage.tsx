import { ChessPiece } from "../classes/ChessPiece"
import { PieceColor, PieceType } from "../utils/types";

type Props = {
    piece: ChessPiece,
    draggable?: boolean,
    handlePress?: (piece: ChessPiece) => void,
    handleClick?: () => void
}

export const PieceImage = ({ piece, handlePress, handleClick, draggable = true }: Props) => {
    const filterValue = piece.color === PieceColor.White  ? 'invert(0)' : 'invert(1)';
    
    return <img
        alt={`${piece.color} ${piece.type}`}
        src={`${piece.type}.png`}
        draggable={draggable}
        width="70px"
        height="70px"
        style={{ cursor: 'pointer', filter: filterValue }}
        onMouseDown={handlePress ? () => handlePress(piece): undefined}
        onClick={handleClick}
    />
}

// type Props2 = {
//     color: PieceColor,
//     type: PieceType,
//     draggable: boolean,
//     onMouseDown?: () => void,
//     onClick?: (piece: ChessPiece) => void
// }

// const PieceImage2 = ({color, type, draggable}: Props2) => {
//     return <img
//         alt={`${color} ${type}`}
//         src={`${type}.png`}
//         draggable={draggable}
//         width="70px"
//         height="70px"
//         style={{ cursor: 'pointer', filter: filterValue }}
//         onMouseDown={() => handleClick(piece)}
//     />
// }