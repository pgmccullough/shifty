/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/react';

export const Menu = ({ badWords, userPause }:any) => {

    const menuStyle = css`
        position: fixed;
        z-index: 4;
        width: 100vw;
        top: -100vh;
        height: calc(100vh - 4rem);
        padding: 2rem;
        background: #eee;
        box-shadow: 0 0 3px 0;
        transition: 0.25s;
        @media (min-width: 600px) {
            width: 50vw;
            right: -50vw;
            top: 4rem;
        }
        @media (min-width: 1100px) {
            width: 33vw;
            right: -33vw;
        }
    `;

    const active = css`
        position: fixed;
        z-index: 4;
        top: 4rem;
        @media (min-width: 600px) {
            right: 0vw;
        }
    `;

    return (
        <div css={userPause?[menuStyle,active]:menuStyle}>
            List of bad guesses: {badWords.map((badWord:any) => <p>{badWord}</p>)}
        </div>
    )
}