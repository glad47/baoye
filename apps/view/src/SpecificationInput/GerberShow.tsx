import React, { useEffect, useState } from "react";
import { useAppState, backToUpload } from "../state";
import LoadFiles from '../LoadFiles/index'
import { Spin } from "antd";

interface GerberShowProps { }
const WRAPPER_STYLE = 'absolute absolute--center near-black tc'
//gerber显示组件
const GerberShow: React.FC<GerberShowProps> = (props) => {
    const { loading, pcbSizeField: { singleSize: { sizeX, sizeY } }, svg, isShow, singleCopper, isBackToUpload, pcbStandardField, dispatch,allKeys } = useAppState()
    const SIZE_CLASS_NAME = sizeX && sizeY && sizeX > sizeY ? 'vertical_svg_first' : 'transverse_svg_first'
    const SIZE_FIRST_CLASS_NAME = sizeX && sizeY && sizeX > sizeY ? 'vertical_svg' : 'transverse_svg'
    const [isTimeOut, setTimer] = useState(false)
    const wordTip = !isTimeOut ? 'Successful geber file upload ！ Analyzing data, please wait and then check.' : 'It takes a little time for analyzing the file. You can also input by your own to get a quote.'
    const {material,layer,silkscreen,solderMask}=pcbStandardField
    useEffect(() => {
        let timer: any
        let isComplete = new Promise((resolve, reject) => {
            timer = setTimeout(() => {
                if (svg !== null) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }, 60000);
        }).then(function (data) {
            setTimer(true)
        }).catch(function (data) {
            setTimer(false)
        })
        return () => {
            if (!isBackToUpload) {
                clearTimeout(timer)
            }
        }
    }, [])
    let newLayer=layer.substr(0,1)
    let defaultImgSrc
    if(material !=='FR4' || newLayer !=='2' || solderMask !=='green' || silkscreen !=='white'){
        if(solderMask!==silkscreen){
            defaultImgSrc=require(`../images/diagram/${material}${newLayer}${solderMask}${silkscreen}.png`)
        }else{
            defaultImgSrc=require(`../images/diagram/${material}${newLayer}green${silkscreen}.png`)
        }
    }else{
        defaultImgSrc=require('../images/FR42greenwhite.png')
    }
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
                            <img src={defaultImgSrc} />
                            <p className='failure_word'>Successful geber file upload but failed to analyze due to different file format. Please input by your own to get a quote.</p>
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

