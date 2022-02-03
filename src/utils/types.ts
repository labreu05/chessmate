import { ChessPiece } from "../classes";

export enum PieceColor {
  Black = "black",
  White = "white",
}

export enum PieceType {
  King = "king",
  Queen = "queen",
  Rook = "rook",
  Bishop = "bishop",
  Knight = "knight",
  Pawn = "pawn",
}

export type BoardState = (ChessPiece | null)[][];

export type GameState = {
  boardState: BoardState;
  turn: PieceColor;
} & Record<PieceColor, PlayerState>;

export type PlayerState = {
  moves: number;
  // piecesTaken: Record<PieceType, number> | {},
  piecesTaken: {
    [PieceType.King]: number;
    [PieceType.Queen]: number;
    [PieceType.Knight]: number;
    [PieceType.Rook]: number;
    [PieceType.Bishop]: number;
    [PieceType.Pawn]: number;
  };
};
