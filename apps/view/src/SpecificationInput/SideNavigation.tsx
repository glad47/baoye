import React, { useState } from 'react';
import { useAppState, changeSizeField, changeQuoteMode } from '../state';


interface SideNavigationProps { }
const SideNavigation: React.FC<SideNavigationProps> = (props) => {
    const { children } = props;
    const { quoteMode, dispatch } = useAppState();
    const tabChange = (event: any, index: number) => {
        event.preventDefault();
        // setActiveIndex(index);
        dispatch(changeQuoteMode(index));
    }

    return (

        <ul>
            {
                React.Children.map(children, (child, index) => {
                    const activerClassName = (quoteMode === index) ? 'cur' : '';
                    // @ts-ignore
                    const isLastClass = children.length === (index+1) ? 'last' : '';
                    let isFilletClassName;
                    if ((quoteMode+1) === index) {
                        isFilletClassName = 'angle2'
                    } else if ((quoteMode-1) === index) {
                        isFilletClassName = 'angle1'
                    }
                    return (
                        <li className={`${activerClassName} ${isFilletClassName} ${isLastClass}`}>
                            <a onClick={(event) => { tabChange(event, index) }}>
                                {child}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export const SideNavigationTab: React.FC = ({ children }) => <React.Fragment>{children}</React.Fragment>

export default SideNavigation;
