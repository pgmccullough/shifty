export const GameStatus = ({ gameStatus, setGameStatus } : any) => {

    return (
        <>
            {gameStatus.paused?gameStatus.message:null}
        </>
    )
}