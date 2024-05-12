import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React from 'react'
import { useState } from 'react';

const initialBoard = () => Array(9).fill(null);
const Practise = () => {
    const [board,setBoard] = useState(initialBoard());
    const [isNext,setIsNext] = useState(true);
    
    const winningPattern = [
        [0,1,2],     
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
        ]

   const calculateWinner = (currentBoard) => {
       for(let i=0;i<winningPattern.length;i++){
           const pattern = winningPattern[i];
           const a = pattern[0];
           const b= pattern[1];
           const c= pattern[2];

           if(currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]){
               return currentBoard[a];
           }
       }
       return null;

   }

    const handleClick = (index) =>{
        const winner = calculateWinner(board);
        if(winner || board[index]){
            return;
        }
        const newBoard = [...board];
        newBoard[index] = isNext ? "X" :"O";
        setBoard(newBoard);
        setIsNext(!isNext);

    }
    const getStatusMessage = () => {
          const winner = calculateWinner(board);
          if(winner){
              return `Player ${winner} wins`;
          }
          if(!board.includes(null)){
              return `Its Draw`;
          }
          return `Player ${isNext ? "X" : "O"} turn`;
    }
    const resetGame = () => {
        setBoard(initialBoard());
        setIsNext(true);
    }


  return (
      <div className="my-game">
        <div>practise</div>
        <div>{getStatusMessage()}</div>
        <button onClick={resetGame}>Reset</button>
        <div className='my-board'>
            {
            board.map((b,index) => {
                return(
                    <button
                      className='cell'
                      onClick={() => handleClick(index)}

                    >
                        {b}

                    </button>
                )
            })
            }
        </div>
      </div>
  )
}

export default Practise