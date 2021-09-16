import React, {useEffect, useState} from 'react'
import emitter from "../../eventBus";
import {resetState, useAppState} from "../../state";

interface TS_TIPS {
    tip: String | number,
    time: number
}

let tipsTimer: NodeJS.Timeout;

const FormTips = () => {
    const [msg, setMsg] = useState<any>();
    useEffect(() => {
        emitter.addListener('Emi_HandleMyTips', (params: TS_TIPS) => {
            handleTips(params);
        })
    }, [])

    const handleTips = (params: TS_TIPS) => {
        const {tip, time} = params;
        setMsg(tip);
        clearTimeout(tipsTimer);
        tipsTimer = setTimeout(() => {
            setMsg(null);
        }, time);
    }

    return <div className="my-tips-container">
        {
            msg &&
            <div className="tips-inner">
                {msg}
            </div>
        }
    </div>
}

export default FormTips;