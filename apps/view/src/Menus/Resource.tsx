import React from 'react'

function Resource() {
    return (
        <div id="resource">
            <div className="navigation">
                <ul className='navigation-left'>
                    <li>
                        <a href='https://www.pcbonline.com/blog/'>Blog</a>
                        <div className="instructions" />
                    </li>
                    <li>
                        <a href='https://www.pcbonline.com/support/home/'>Support</a>
                        <div className="instructions" />
                    </li>
                    <li>
                        <a href='https://www.pcbonline.com/feedback/'>Feedback</a>
                        <div className="instructions" />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Resource