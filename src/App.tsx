import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [boards, setBoards] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleClickBoard = (index: number) => {
    if (boards[index] !== 0 || isGameOver) return;
    const newBoards = [...boards];
    newBoards[index] = turn;
    setBoards(newBoards);
    setTurn(3 - turn);
  }

  const displayGameStatus = useMemo(() => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (boards[a] !== 0 && boards[a] === boards[b] && boards[a] === boards[c]) {
        setIsGameOver(true);
        return `Player ${boards[a]} wins!`;
      }
    }

    if (boards.every(board => board !== 0)) {
      setIsGameOver(true);
      return 'It\'s a draw!';
    }

    return `Player ${turn}'s turn`;
  }, [boards, turn]);

  const handleClickNewGame = () => {
    setBoards([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setTurn(1);
    setIsGameOver(false);
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <button onClick={handleClickNewGame}>New Game</button>
      </div>
      <div style={{ marginBottom: 50 }}>Game Status: {displayGameStatus}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {boards.map((board, index) => (
          <div key={index}><button style={{ width: 50, height: 50 }} onClick={() => handleClickBoard(index)}>{board === 1 ? 'X' : board === 2 ? 'O' : ''}</button></div>
        ))}
      </div>
    </>
  )
}

export default App
