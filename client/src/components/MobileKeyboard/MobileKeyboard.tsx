/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';


const enKeys = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"]
]

const keyboard = css`
    position: fixed;
    bottom: 0;
`

const keyrow = css`
    display: flex;
    justify-content: center;
`

const key = css`
    background: #666;
    color: #fff;
    margin: 0.1rem;
    border: 1px black solid;
    padding: 0.7rem;
    border-radius: 4px;
    width: ${100/enKeys[2].length}%;
    visibility: visible;
    @media (min-width: 600px) {
        visibility: hidden;
    }
`

export const MobileKeyboard = ({ setMobileLetter }:any) => {
    
    const keyTap = (char:String) => {
        setMobileLetter(char);
    }

    return (
        <div css={keyboard}>
            {enKeys.map((row,i) =>
                <div key={`keyrow-${i}`} css={keyrow}>
                    {row.map((char,x)=>
                        <div 
                            key={`charKey-${x}`} 
                            css={key}
                            onClick={()=>keyTap(char)}
                        >
                            {char}
                        </div>)}
                </div>
            )}
        </div>
    )
}