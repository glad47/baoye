import React from 'react'

function MobileFoot() {
    return (
        <div className="mobile-foot">
            <div className="mobile-copyright">
                <p><img src={require('../images/logo_footer.png')} title='logo' alt='logo' /></p>
                <p>@2000-2020 PCB ONLINE LTD. All Rights Reserved</p>
            </div>
        </div>
    )
}

export default MobileFoot