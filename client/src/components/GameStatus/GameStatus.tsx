/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

export const GameStatus = ({ gameStatus, setGameStatus } : any) => {

    let message = css`
        position: absolute;
        font-size: 40px;
        transform: scale(0.2);
        transition: 1.5s;
        opacity: 0;
    `;

    let display;
    
    gameStatus.paused
        ?display = css`
            transform: scale(1);
            opacity: 1;
        `
        :display = css``;

    return (
        <div css={[message, display]}>
            {gameStatus.paused?gameStatus.message:null}
        </div>
    )
}