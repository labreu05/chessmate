import { Rook } from "../classes/Rook";
import { ChessPiece, PieceColor} from "../classes/ChessPiece";
import { King } from "../classes/King";
import { Queen } from "../classes/Queen";
import { Knight } from "../classes/Knight";
import { Bishop } from "../classes/Bishop";
import { Pawn } from "../classes/Pawn";

export const initialBoard: (ChessPiece|null)[][] = [
    [new Rook(PieceColor.Black, [0,0]),null,null,null,new King(PieceColor.Black, [0,4]),null,null,new Rook(PieceColor.Black, [0,7])],
    // [new Rook(PieceColor.Black, [0,0]), new Knight(PieceColor.Black, [0,1]), new Bishop(PieceColor.Black, [0,2]), new Queen(PieceColor.Black, [0,3]), new King(PieceColor.Black, [0,4]), new Bishop(PieceColor.Black, [0,5]), new Knight(PieceColor.Black, [0,6]), new Rook(PieceColor.Black, [0, 7])],
    [new Pawn(PieceColor.Black, [1, 0]),new Pawn(PieceColor.Black, [1, 1]),new Pawn(PieceColor.Black, [1, 2]),new Pawn(PieceColor.Black, [1, 3]),new Pawn(PieceColor.Black, [1, 4]),new Pawn(PieceColor.Black, [1, 5]),new Pawn(PieceColor.Black, [1, 6]),new Pawn(PieceColor.Black, [1, 7])],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [new Pawn(PieceColor.White, [6, 0]),new Pawn(PieceColor.White, [6, 1]),new Pawn(PieceColor.White, [6, 2]),new Pawn(PieceColor.White, [6, 3]),new Pawn(PieceColor.White, [6, 4]),new Pawn(PieceColor.White, [6, 5]),new Pawn(PieceColor.White, [6, 6]),new Pawn(PieceColor.White, [6, 7])],
    [new Rook(PieceColor.White, [7,0]),null,null,null,new King(PieceColor.White, [7,4]),null,null,new Rook(PieceColor.White, [7,7])],
    // [new Rook(PieceColor.White, [7,0]), new Knight(PieceColor.White, [7,1]), new Bishop(PieceColor.White, [7,2]), new Queen(PieceColor.White, [7,3]), new King(PieceColor.White, [7,4]), new Bishop(PieceColor.White, [7,5]), new Knight(PieceColor.White, [7,6]), new Rook(PieceColor.White, [7, 7])],
];