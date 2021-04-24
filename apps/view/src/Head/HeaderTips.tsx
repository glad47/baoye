import React from 'react'

const playImg = require(`../images/quate_icon5.png`);
const closeImg = require(`../images/quate_close.png`);
const HeaderTips = (props: any) => {
    const {txt} = props;
    return(
        <div className="h-tips">
            <div className="t-box">
                <span>{txt}</span>
                <img src={playImg} alt="play" className="player"/>
                <img src={closeImg} alt="close" className="close"/>
            </div>
        </div>
    )
}

HeaderTips.defaultProps = {txt: 'How to order on PCBONLINE ?  Full step-by-step shopping tutorial for beginners'}

export default HeaderTips