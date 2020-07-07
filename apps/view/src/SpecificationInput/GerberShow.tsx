import React, { useEffect, useState } from "react";
import { useAppState, backToUpload } from "../state";
import LoadFiles from '../LoadFiles/index'
import { Spin } from "antd";

interface GerberShowProps { }
const WRAPPER_STYLE = 'absolute absolute--center near-black tc'
//gerber显示组件
const GerberShow: React.FC<GerberShowProps> = (props) => {
    const { loading, pcbSizeField: { singleSize: { sizeX, sizeY } }, svg, isShow, singleCopper, isBackToUpload, pcbStandardField, dispatch,fillData} = useAppState()
    const SIZE_CLASS_NAME = sizeX && sizeY && sizeX > sizeY ? 'vertical_svg_first' : 'transverse_svg_first'
    const SIZE_FIRST_CLASS_NAME = sizeX && sizeY && sizeX > sizeY ? 'vertical_svg' : 'transverse_svg'
    const wordTip=fillData?  'Successful geber file upload ！ Analyzing data, please wait and then check.' :'It takes a little time for analyzing the file. You can also input by your own to get a quote.' 
    return (
        <>
            {svg !== null ?
                <>
                    {svg !== null && isShow ?
                        <>
                            {
                                singleCopper == null ?
                                    <div className={SIZE_FIRST_CLASS_NAME}>
                                        <div className={SIZE_CLASS_NAME}>
                                            <div dangerouslySetInnerHTML={{ __html: svg?.topSvg }} />
                                        </div>
                                        <div className={SIZE_CLASS_NAME}>
                                            <div dangerouslySetInnerHTML={{ __html: svg?.bottomSvg }} />
                                        </div>
                                    </div> :
                                    <div className='show_one_img'>
                                        {singleCopper === 'top' ?
                                            <div dangerouslySetInnerHTML={{ __html: svg?.topSvg }} className='svg_show_img' /> :
                                            <div dangerouslySetInnerHTML={{ __html: svg?.bottomSvg }} className='svg_show_img' />
                                        }
                                    </div>
                            }
                        </>
                        :
                        <div className='show_default_img'>
                            <img src={require('../images/FR42greenwhite.png')} />
                        </div>
                    }
                </>
                :
                <div className="show_default_loading">
                    <div className='default_img_loading'><img src={require(`../images/successful_updata.gif`)} /></div>
                    <p className='fill_pit'>{wordTip}</p>
                </div>
            }
        </>
    )
}

export default GerberShow

