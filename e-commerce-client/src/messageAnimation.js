import { css } from "styled-components";

export const anime = (props, props2)=>{
    if(props === "showC" || props2 === "showW"){
        return css`
            animation: messageShow 0.5s ease;
            opacity: 1;
            @keyframes messageShow {
                from{
                    bottom: -50px;
                }
                to{
                    bottom: 100px;
                }
            }
            `
    } else if(props === "noneC" || props2 === "noneW"){
        return css`
            animation: messageWent 0.6s ease;
            opacity: 1;
            @keyframes messageWent{
                from{
                    bottom: 100px;
                    opacity: 1;
                }
                to{
                    bottom: 600px;
                    opacity: 0;
                }
            }
        `
    }
}