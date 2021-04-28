import React from 'react';

const HistoryAddress = () => {
    const aa = [1, 2, 3]
    return (
        <div className="history-addr">
            <div>
                <span>History address</span>
                <div className="history-addr-box">
                    {
                        aa.map(item => (
                            <div className={`history-addr-li ${item ===1 ? ' active' : ''}`}>
                                <strong>Ar'yan zhang</strong>
                                <span className="tel">15818516645</span>
                                <span className="addr">
                        xin hang hua fu A, Washington/15301 Alabanma. United States
                    </span>
                                <img src={require("../../../images/close_circle.png")} alt="" className="close"/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HistoryAddress;