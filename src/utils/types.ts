import { ChessPiece } from "../classes/ChessPiece";

export type BoardState = (ChessPiece|null)[][];

export enum PieceColor {
    Black = 'black',
    White = 'white'
}

export enum PieceType {
    King = 'king',
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn'
}