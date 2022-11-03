/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const contentData:any = {
    welcome: `                     
    <p>
        Thanks for visiting! Shuft is a fun (<em>at least we think it is</em> 😛) word game where you change each letter of a four-letter word--one at a time, in order--to form 5 different words!
    </p>
    <p>
        For example, <b>CHIP</b> becomes <b>SHIP</b> becomes <b> SLIP</b> becomes <b>SLOP</b> becomes <b>SLOB</b>.
    </p>
    <p>
        But watch out, the clock is ticking! Click <em>START</em> to try it out, or <em>INSTRUCTIONS</em> if you need more info.
    </p>`,
    instructions: `
    <p>
        When the game first starts, you are given a randomly selected four-letter word. You will be prompted to replace the first letter with a different one than is currently being used. 
    </p>
    <p>
        There are three possible outcomes when you select a letter:
    </p>
    <p style="text-decoration: underline; text-decoration-color: #ee7674;">
        1. The letter does not form a word. Example: the word is <b>LOSE</b> and you choose <b>E</b>. <b>EOSE</b> is not a word.
    </p>
    <p style="text-decoration: underline; text-decoration-color: #edd892;">
        2. The letter <em>does</em> form a word, but it will eventually lead to a dead end.
    </p>
    <p style="text-decoration: underline; text-decoration-color: #edd892;">
        Example: the word is <b>LOSE</b> and you choose <b>D</b>. 
    </p>    
    <p style="text-decoration: underline; text-decoration-color: #edd892;">
        <b>DOSE</b> is a word, but on the next turn, it will be impossible to replace <b>O</b> with another letter and create a word.
    </p>
    <p style="text-decoration: underline; text-decoration-color: #8affc1;">
        3. The letter forms a word that is, you know, an actual word, <em>and</em> provides a path forward! 🎉 This is our favorite outcome...
    </p>
    <p style="text-decoration: underline; text-decoration-color: #8affc1;">
        Example: The word is <b>LOSE</b> and you choose <b>R</b>, giving you <b>ROSE</b>, which sets you up for <b>RISE</b> >> <b>RIFE</b> >> <b>RIFF</b>, among many other potential outcomes!
    </p>
    <p>
        We're still working on a points system for a future release. For now, the object is to see how long you can go!
    </p>
    <p>
        When you start the game, you have 30 seconds to build a path of new letters. If the timer hits zero before you do, game over!
    </p>
    <p>
        But if you beat the buzzer, you get a new word, but 2.5 seconds shaved off the timer.
    </p>
    <p>
        So what are you waiting for? Hit <b>START</b> and give it a try! Good <b>LUCK</b> (<b>BUCK</b> <b>BACK</b> <b>BARK</b> <b>BARE</b>)
    </p>
    `
}

const contentModule = css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 6rem; 
    width: 30rem; 
    min-height: 24rem; 
    text-align: center; 
    border-radius: 12px; 
    box-shadow: 0 0 6px #999;
    padding: 0 2rem;
    line-height: 1.75rem;
    overflow: hidden;
`;
const dotContainer = css`
    display: flex;
    justify-content: center;
`
const dot = css`
    margin: 0.375rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 100%;
    background: #ccc;
    cursor: pointer;
`
const activeDotStyle = css`
    background: #686868;
    cursor: default;
`
const contentBody = css`
    max-height: 17rem; 
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    transition-property: margin-left;
    transition-duration: 0.5s;
    & p {
        box-sizing: content-box;
        width: 100%;
        padding-right: 70px;
    }
`;

const arrow = css`
    position: absolute;
    width: 3rem;
    height: 3rem;
    background: #fff;
    line-height: 2.75rem;
    border-radius: 100%;
    box-shadow: 0 0 6px 0 #999;
    font-weight: 700;
    font-size: 2rem;
    cursor: pointer;
`
const backArrow = css`
    text-align: left;
    padding-left: 0.75rem;
    margin-left: -3rem;
`
const nextArrow = css`
    text-align: left;
    padding-left: 1rem;
    margin-left: 26rem;
`
const redBG = css`background:#ee7674`;
const blueBG = css`background:#bde0fe`;
const blueBorder = css`border-color: #e0effe;`;
const yellowBG = css`background:#edd892`;
const greenBG = css`background:#8affc1`;
const greenBorder = css`border: 5px #cdffe1 solid`;
const borderButton = css`border-width: 5px; border-style: solid; transition: 0.25s;&:hover {border-width: 7px;}`;

export const ContentModule = ({ gameRoute, setGameRoute }:any) => {

    const [columns, getColumns] = useState<any>([]);
    const [activeDot, setActiveDot] = useState(1);

    const ref = useRef<any>(null);

    useLayoutEffect(() => {
        setActiveDot(1);
        let columnCount = ref.current.scrollWidth/ref.current.offsetWidth;
        getColumns(Array(Math.round(columnCount)).fill(0))
    },[ref, gameRoute]);

    useEffect(() => {
        ref.current.style.marginLeft = ((-1*ref.current.offsetWidth-70)*(activeDot-1))+"px";
    },[activeDot])


    return (
        <div css={contentModule}>
            {columns.length>1&&activeDot!==1
                ?<div 
                    onClick={() => setActiveDot(activeDot-1)}
                    css={[arrow, backArrow]}
                >
                    &lt;
                </div>
                :""}
            {columns.length>1&&activeDot<columns.length
                ?<div 
                    onClick={() => setActiveDot(activeDot+1)}
                    css={[arrow, nextArrow]}
                >
                    &gt;
                </div>
                :""}
            <h1>{gameRoute[0].toUpperCase()+gameRoute.slice(1)}!</h1>
            <div 
                css={contentBody} 
                ref={ref}
                dangerouslySetInnerHTML={{__html: contentData[gameRoute]}}
            >
            </div>
            {columns.length>1
                ?<div css={[dotContainer]}>
                    {columns.map((_null : any, i: number) => 
                        <div
                            key={`columnDot-${i}`}
                            onClick={() => setActiveDot(i+1)}
                            css={[dot, i===activeDot-1?activeDotStyle:""]} 
                        />)
                    }
                </div>
                :""
            }
            <div>
                <button
                    css={[borderButton, greenBorder, greenBG]}
                    onClick={()=>setGameRoute("play")}
                >
                    Start
                </button>
                {gameRoute==="welcome"
                    ?<button
                        css={[borderButton, blueBorder, blueBG]}
                        onClick={()=>setGameRoute("instructions")}
                    >
                        Instructions
                    </button>
                    :<button
                        css={[borderButton, blueBorder, blueBG]}
                        onClick={()=>setGameRoute("welcome")}
                    >
                        Welcome
                    </button>
                }
            </div>
        </div>
    )
}