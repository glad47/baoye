import React from 'react';
const updateImg = require(`../../images/successful_updata.gif`)

export default () => {

    return (
        <div className="file-updating">
            <div>
                <img src={updateImg} alt=""/>
                <span>
                Successful Gerber file upload! The system is analyzing data. Please wait and check the specifications.
            </span>
            </div>
        </div>

    )
}