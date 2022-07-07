import React, { useState } from 'react'

const inicioDeJogo = [
 ['', '', '', ],
 ['', '', '', ], 
 ['', '', '', ]
];
 
const hasSequence = (items) => /ooo|xxx/.test(items.join(''))


const checkBasicPattern  = (acc, current, index, arr) => {
    if (acc) return true
    const checkHorizontal = hasSequence(current)
    const checkVertical = hasSequence(arr.map(item =>item[index]))

    return checkHorizontal || checkVertical

}

const checkDiagonal = (game) => {
    return (
        hasSequence(game.map((el, index, arr) => arr[index][index])) ||
        hasSequence([...game].reverse().map((el, index, arr) => arr[index][index]))
    )
};


export default function Game() {
    const [currentPlayer, setCurrentPlayer] = useState("x");
    const [game, setGame] = useState(inicioDeJogo);

    const isGameOver = game.reduce(checkBasicPattern, false) || checkDiagonal(game);

    
    return (
        

    <section id='game'>
        <header>
            <img className='senhora' src='https://images.vexels.com/media/users/3/215677/isolated/preview/ab7fef85c3d794b83303d31cf2dd40fb-velha-senhora-bengala-plana.png'></img>
            <h1>jogo da Vélhinha</h1>
        </header>

           
        <div>
            {isGameOver && currentPlayer == "o" && (
                <span className='vencedor'> <div className='resultado'>X</div> - Ganhou !</span>
            )}
        </div>
        <div>
            {isGameOver && currentPlayer == "x" && (
                <span className='vencedor'> <div className='resultado'>O</div> - Ganhou !</span>
            )}
        </div>
        
        <div className='board'>
            {game.map((row , rowIndex) => 
                <div className='row'>
                    {row.map((cell , cellIndex) => 
                        <div 
                        className='cell' 
                        role="button" 
                        onClick={() => {
                            if (cell !== "") return;
                            setGame(game.map((rowItem, rowI) => {
                                return rowItem.map((cellItem, cellI) => {
                                    if (rowI  === rowIndex && cellI === cellIndex) {
                                        return currentPlayer;
                                    }
                                    return cellItem;
                                })
                            }))
                            setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')
                        }}>
                            {cell}
                        </div>
                    )}
                </div>
            )}
            

        </div>
        <div className='actions'>
            <button type='button' onClick= {() => setGame(inicioDeJogo)}>
                Jogar {isGameOver && (<span>novamente</span>)}
            </button>
        </div>
    </section>

                    
    )
}
