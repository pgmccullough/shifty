/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

export const Header = () => {

    const headStyle = css`
        display: flex;
        position: fixed;
        background: #fff;
        top: 0;
        left: 0;
        width: 100%;
        height: 4rem;
        color: #666;
        background-image: url('/rainbow-gradient.png');
        background-repeat: repeat-x;
        background-size: 100vw 0.3rem;
        background-position: 0 3.7rem;
        font-weight: 700;
        box-shadow: 0 0 6px 0 #666;
        align-items: center;
        justify-content: center;
        & img {
            width: 2rem;
            margin: 0.5rem;
        }
    `;

    const hamburgerIcon = css`
        position: fixed;
        right: 0;
        top: 0;
        border: 2px #999 solid;
        box-shadow: inset 0 0 3px 0 #888;
        border-radius: 0.6rem;
        margin: 0.3rem;
        height: 3rem;
        width: 3rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const hamburgerLine = css`
        width: 2rem;
        height: 4px;
        background: #666;
        border-radius: 2px;
        &::before {
            content: "";
            position: absolute;
            margin-top: -0.55rem;
            width: 2rem;
            height: 4px;
            background: #666;
            border-radius: 2px;
        }
        &::after {
            content: "";
            position: absolute;
            margin-top: 0.55rem;
            width: 2rem;
            height: 4px;
            background: #666;
            border-radius: 2px;
        }
    `;

    return (
        <div css={headStyle}>
            S H <img src="/favicon-228.png" /> F T
            <div css={hamburgerIcon}>
                <div css={hamburgerLine} />
            </div>
        </div>
    )
}