import style from "../../css_modules/Board.module.css";
import { BoardProps } from "../../types";

const Board:React.FC<BoardProps> = ({board, status }) => {
  return (
    <div className={style.board}>
      {board.map((char: string, idx: number) => (
        <div
          key={idx}
          data-testid="cell"
          className={`${style.cell} ${status === "valid" ? style.green : status === "invalid" ? style.red : ""}`}>
          {char}
        </div>
      ))}
    </div>
  );
}

export default Board
