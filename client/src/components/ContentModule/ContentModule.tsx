/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

export const ContentModule = ({ gameRoute, setGameRoute }:any) => {
        switch(gameRoute) {
            case "welcome":
                return (
                    <div>
                        Welcome Page
                        <button onClick={()=>setGameRoute("play")}>Start</button>
                        <button onClick={()=>setGameRoute("instructions")}>Instructions</button>
                    </div>
                )
            case "instructions":
                return (
                    <div>
                        Instructions Page
                        <button onClick={()=>setGameRoute("play")}>Start</button>
                        <button onClick={()=>setGameRoute("welcome")}>Welcome</button>
                    </div>
                )
            default:
                return (
                    <></>
                )
        }
}