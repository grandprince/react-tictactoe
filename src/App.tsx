import { useMemo, useState } from 'react'
import './App.css'

const checkWin = (boards: number[]) => {
  const size = 5;
  const directions = [
    { dx: 0, dy: 1 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 }
  ];

  for (let i = 0; i < boards.length; i++) {
    if (boards[i] === 0) continue;

    const y = i % size;
    const x = (i - y) / size;

    for (const { dx, dy } of directions) {
      for (let j = 1; j <= 2; j++) {
        const x1 = x + dx * j;
        const y1 = y + dy * j;
        const index1 = x1 * size + y1;
        if (x1 < 0 || x1 >= size || y1 < 0 || y1 >= size || boards[index1] !== boards[i]) {
          break;
        }
        if (j === 2) {
          return boards[i];
        }
      }
    }
  }
  return undefined;
}

const checkDraw = (boards: number[]) => {
  return boards.every(board => board !== 0);
}

function App() {
  const [boards, setBoards] = useState(Array(5 * 5).fill(0));
  const [turn, setTurn] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleClickBoard = (index: number) => {
    if (boards[index] !== 0 || isGameOver) return;
    const newBoards = [...boards];
    newBoards[index] = turn;
    setBoards(newBoards);
    setTurn(turn === 1 ? 2 : 1);
  }

  const displayGameStatus = useMemo(() => {
    const isWin = checkWin(boards);
    if (isWin) {
      setIsGameOver(true);
      return `Player ${isWin} wins!`;
    }

    if (checkDraw(boards)) {
      setIsGameOver(true);
      return 'It\'s a draw!';
    }

    return `Player ${turn}'s turn`;
  }, [boards, turn]);

  const handleClickNewGame = () => {
    setBoards(Array(5 * 5).fill(0));
    setTurn(1);
    setIsGameOver(false);
  }

  return (
    <>
      <div className="game-title">
        <button onClick={handleClickNewGame}>New Game</button>
      </div>
      <div className="game-status">Game Status: {displayGameStatus}</div>
      <div className="game-board">
        {boards.map((board, index) => (
          <div key={index}><button className="game-button" onClick={() => handleClickBoard(index)}>{board === 1 ? 'X' : board === 2 ? 'O' : ''}</button></div>
        ))}
      </div>
    </>
  )
}

export default App
