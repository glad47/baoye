import React from 'react'

interface Interface {
    title: string
}

const ProcessHeader:React.FC<any> = (props:Interface) => {
    const { title } = props;
    return (
        <div className="process-header">
            <strong>{title}</strong>
            <strong>Order Summary</strong>
        </div>
    )
}

ProcessHeader.defaultProps = {title: 'MY SHOPPING CART'}
export default ProcessHeader;