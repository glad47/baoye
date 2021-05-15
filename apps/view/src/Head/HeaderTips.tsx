import React, {useState} from 'react'

const playImg = require(`../images/quate_icon5.png`);
const closeImg = require(`../images/quate_close.png`);
const HeaderTips = (props: any) => {
    const [flags, setFlags] = useState<boolean>(true);
    const {txt} = props;
    const handlerClose = (sta: false) => {
        alert(6)
        setFlags(sta);
    }
    const DOM = (
        <div>
            {
                flags ?
                    <div className="h-tips">
                        <div className="t-box">
                            <span>{txt}</span>
                            <img src={playImg} alt="play" className="player"/>
                            <img src={closeImg} alt="close" className="close"/>
                        </div>
                    </div>
                    : 66666
            }
        </div>
    )
    return DOM;
}

HeaderTips.defaultProps = {txt: 'How to order on PCBONLINE ?  Full step-by-step shopping tutorial for beginners'}

export default HeaderTips