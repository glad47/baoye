import React, {useState} from 'react';
import PcbLayout from "../Components/PcbLayout";
import '../styles/route-sys-messages.css'

const notify_icon = require('../images/quate_icon24.png');
const close_icon = require('../images/close_circle.png');

export default () => {
    const [list, setList] = useState([
        {
            content: 'You order P6554545 has been approved, Go to the payment',
            gmtCreate: '1 miniute ago'
        },
        {
            content: 'You order P6554545 has been approved, Go to the payment',
            gmtCreate: '1 miniute ago'
        },
        {
            content: 'You order P6554545 has been approved, Go to the payment',
            gmtCreate: '1 miniute ago'
        }
    ])

    const delMessage = (index: number) => {
        const def = [...list];
        def.splice(index, 1);
        setList(def);
    }

    return (
        <PcbLayout>
            <div className="route-sysMes">
                <div className="header">
                    <div>
                        <img src={notify_icon} alt=""/>
                        <span>System message</span>
                    </div>
                </div>
                <div className="content-box">
                    {
                        list.map((item, index) => (
                            <div className="mes-li" key={`sysMess_${index}`}>
                                <div className="mes-h">
                                    <span className="dot"></span>
                                    <span className="content">{item.content}</span>
                                    <span className="time">{item.gmtCreate}</span>
                                </div>
                                <img src={close_icon} alt="" className="close" onClick={() => delMessage(index)}/>
                            </div>
                        ))
                    }
                </div>
                <div className="sys-Mes-foot">
                </div>
            </div>
        </PcbLayout>
    )
}