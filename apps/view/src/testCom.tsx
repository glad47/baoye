import React from 'react'
import PcbLayout from "./Components/PcbLayout";

const TestCom = () => {
    const myDom = (
        <div>6565656
            <strong>6666</strong>
        </div>
    )
    return (
        <PcbLayout>
            {myDom}
        </PcbLayout>
    )
}

export default TestCom;