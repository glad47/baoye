import React, {useState} from 'react'

const playImg = require(`../images/quate_icon5.png`);
const closeImg = require(`../images/quate_close.png`);

const HeaderTips = (props: any) => {
    const [flags, setFlags] = useState<boolean>(true);
    const {txt} = props;

    const handlerClose = (type: any) => {
        if (props.closeTip) {
            props.closeTip(type);
        }
    }
    const DOM = (
        <div>
            <div className="h-tips" onClick={() => handlerClose(1)}>
                <div className="t-box">
                    <span>{txt}</span>
                    <img src={playImg} alt="play" className="player"/>
                    <img src={closeImg} alt="close" className="close" onClick={e => {
                        e.stopPropagation();
                        handlerClose(null);
                    }}/>
                </div>
            </div>
        </div>
    )
    return DOM;
}

HeaderTips.defaultProps = {txt: 'How to order on PCBONLINE ?  Full step-by-step shopping tutorial for beginners'}

export default HeaderTips