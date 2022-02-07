import { Badge, Button, Descriptions } from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";
import {
  GameState,
  PieceColor,
  PieceType,
  PlayerState,
} from "../../utils/types";
import { PieceImage } from "../PieceImage/PieceImage";
import "./styles.scss";

type Props = {
  children: JSX.Element;
  state: GameState;
};

const getTakenPieces = (playerState: PlayerState, color: PieceColor) => {
  return (
    <div className="taken-pieces-container">
      {Object.entries(playerState.piecesTaken).map(([key, value]) => {
        const type = key as PieceType;

        return value > 0 ? (
          <div>
            <Badge
              count={value}
              offset={[-10, 40]}
              color="lime"
              key={`${type}-${value}`}
            >
              <PieceImage type={type} color={color} size="small" />
            </Badge>
          </div>
        ) : null;
      })}
    </div>
  );
};

export const GameContainer = ({ children, state }: Props) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Chess Mate</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Descriptions bordered>
              <DescriptionsItem label="Turn">{state.turn}</DescriptionsItem>
              <DescriptionsItem label="Moves">
                {state.black.moves + state.white.moves}
              </DescriptionsItem>
            </Descriptions>
            <Button>Reset Game</Button>
          </div>
          {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
          {getTakenPieces(state.black, PieceColor.White)}
          {/* </div> */}
          <div>{children}</div>
          {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
          {getTakenPieces(state.white, PieceColor.Black)}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
