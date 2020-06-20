import React, { useState } from 'react';
import { useAppState, changeSizeField, changeQuoteMode } from '../state';


interface SideNavigationProps {}
const SideNavigation: React.FC<SideNavigationProps> = (props) =>{
    const { children } = props;
    const {quoteMode,dispatch} = useAppState();
    console.log(children)
    const tabChange = (event: any,index:number) =>{
        event.preventDefault();
        // setActiveIndex(index);
        dispatch(changeQuoteMode(index));
    }
    return (
       <ul>
           {
               React.Children.map(children,(child,index)=>{
                   const activerClassName = (quoteMode === index) ? 'cur' : '';
                   return (
                   <li className={activerClassName}>
                       <a onClick={(event)=>{tabChange(event,index)}}>
                           {child}
                       </a>
                   </li>
                   )
               })
           }
      </ul>
    )
}

export const SideNavigationTab: React.FC = ({children}) => <React.Fragment>{children}</React.Fragment>

export default SideNavigation;