/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/react';

import React, { useEffect, useState } from 'react';  // Default imported for Emotion fragment issue
import { Menu } from '../Menu/Menu';

export const Header = ({ trackGameHistory, gameHistory, gameStatus, setGameRoute, setGameStatus, userPause, setUserPause }:any) => {

    const scrollBorder = keyframes`
        0% {background-position: 0 3.7rem;}
        100% {background-position: -100vw 3.7rem;}
    `

    const headStyle = css`
        display: flex;
        position: fixed;
        z-index: 5;
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
        & a {
            text-decoration: none;
            color: #666;
            display: flex;
            align-items: center;
        }
    `;

    const headStylePaused = css`
        animation: ${scrollBorder} 3s linear infinite;
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

    const hamburgerLines = css`
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

    const logoClick = (e:any) => {
        e.preventDefault();
        setGameRoute("welcome");
    } 

    useEffect(()=> {
        if(userPause===true) {
            if(!gameStatus.paused) {
                setGameStatus((prev : any) => ({...gameStatus, paused: true, status: 3, message: "Paused", prePause: prev}));
            }
        } else {
            if(gameStatus.status===3) {
                setGameStatus({...gameStatus.prePause});
            }
        }
    },[userPause])

    return (
        <>
            <div css={gameStatus.paused?[headStyle,headStylePaused]:headStyle}>
                <a 
                    href="https://shuft.app/"
                    onClick={logoClick}
                >
                    S H <img src="/favicon-228.png" /> F T
                </a>
                <div css={hamburgerIcon}
                    onClick={() => setUserPause(!userPause)}
                >
                    <div css={hamburgerLines} />
                </div>
            </div>
            <Menu 
                userPause={userPause}
            />
        </>
    )
}