import { Rook } from "../classes/Rook";
import { PieceClass, PieceColor, PieceType,  } from "../classes/Piece";
import { King } from "../classes/King";
import { Queen } from "../classes/Queen";
import { Knight } from "../classes/Knight";
import { Bishop } from "../classes/Bishop";
import { Pawn } from "../classes/Pawn";

// const getBlackPiece = (type: PieceType, pos: [posX: number, posY: number]) => new PieceClass(type, PieceColor.Black, pos);
// const getWhitePiece = (type: PieceType, pos: [posX: number, posY: number]) => new PieceClass(type, PieceColor.White, pos);

// export const initialBoard: (PieceClass|null)[][] = [
//     [Broo(PieceType.Rook, [0,0]), getBlackPiece(PieceType.Knight, [0,1]),getBlackPiece(PieceType.Bishop, [0,2]), getBlackPiece(PieceType.Queen, [0,3]),getBlackPiece(PieceType.King, [0,4]),getBlackPiece(PieceType.Bishop, [0,5]),getBlackPiece(PieceType.Knight, [0,6]),getBlackPiece(PieceType.Rook, [0,7])],
//     [getBlackPiece(PieceType.Pawn, [1,0]),getBlackPiece(PieceType.Pawn, [1,1]),getBlackPiece(PieceType.Pawn, [1,2]),getBlackPiece(PieceType.Pawn, [1,3]),getBlackPiece(PieceType.Pawn, [1,4]),getBlackPiece(PieceType.Pawn, [1,5]),getBlackPiece(PieceType.Pawn, [1,6]),getBlackPiece(PieceType.Pawn, [1,7])],
//     [null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null],
//     [getWhitePiece(PieceType.Pawn, [6, 0]), getWhitePiece(PieceType.Pawn, [6, 1]), getWhitePiece(PieceType.Pawn, [6, 2]), getWhitePiece(PieceType.Pawn, [6, 3]), getWhitePiece(PieceType.Pawn, [6, 4]), getWhitePiece(PieceType.Pawn, [6, 5]), getWhitePiece(PieceType.Pawn, [6, 6]), getWhitePiece(PieceType.Pawn, [6, 7])],
//     [getWhitePiece(PieceType.Rook, [7, 0]), getWhitePiece(PieceType.Knight, [7, 1]), getWhitePiece(PieceType.Bishop, [7, 2]), getWhitePiece(PieceType.Queen, [7, 3]), getWhitePiece(PieceType.King, [7, 4]), getWhitePiece(PieceType.Bishop, [7, 5]), getWhitePiece(PieceType.Knight, [7, 6]), getWhitePiece(PieceType.Rook, [7, 7])]
// ];

export const initialBoard: (PieceClass|null)[][] = [
    [new Rook(PieceColor.Black, [0,0]), new Knight(PieceColor.Black, [0,1]), new Bishop(PieceColor.Black, [0,2]), new Queen(PieceColor.Black, [0,3]), new King(PieceColor.Black, [0,4]), new Bishop(PieceColor.Black, [0,5]), new Knight(PieceColor.Black, [0,6]), new Rook(PieceColor.Black, [0, 7])],
    [new Pawn(PieceColor.Black, [1, 0]),new Pawn(PieceColor.Black, [1, 1]),new Pawn(PieceColor.Black, [1, 2]),new Pawn(PieceColor.Black, [1, 3]),new Pawn(PieceColor.Black, [1, 4]),new Pawn(PieceColor.Black, [1, 5]),new Pawn(PieceColor.Black, [1, 6]),new Pawn(PieceColor.Black, [1, 7])],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [new Pawn(PieceColor.White, [6, 0]),new Pawn(PieceColor.White, [6, 1]),new Pawn(PieceColor.White, [6, 2]),new Pawn(PieceColor.White, [6, 3]),new Pawn(PieceColor.White, [6, 4]),new Pawn(PieceColor.White, [6, 5]),new Pawn(PieceColor.White, [6, 6]),new Pawn(PieceColor.White, [6, 7])],
    [new Rook(PieceColor.White, [7,0]), new Knight(PieceColor.White, [7,1]), new Bishop(PieceColor.White, [7,2]), new Queen(PieceColor.White, [7,3]), new King(PieceColor.White, [7,4]), new Bishop(PieceColor.White, [7,5]), new Knight(PieceColor.White, [7,6]), new Rook(PieceColor.White, [7, 7])],
];