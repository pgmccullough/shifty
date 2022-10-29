/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

const Timer = ({ gameStatus, timer }:any) => {

    const blur = css`
        filter: blur(4px);
        opacity: 0.4;
        transition: 1.5s;
    `
    
    return (
        <h1 css={gameStatus.paused&&blur}>{timer.toFixed(2)}</h1>
    )
}

export { Timer };