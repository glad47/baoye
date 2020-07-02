import React,{useEffect,useState} from "react";
import { useAppState,backToUpload } from "../state";
import { Spin } from "antd";

interface GerberShowProps { }

//gerber显示组件
const GerberShow: React.FC<GerberShowProps> = (props) =>{
    const {loading,pcbSizeField:{singleSize:{sizeX}},svg,isShow,singleCopper,isBackToUpload,pcbStandardField,dispatch} = useAppState()
    const SIZE_CLASS_NAME = sizeX && sizeX > 70 ? 'vertical_svg_first' : 'transverse_svg_first'
    const SIZE_FIRST_CLASS_NAME = sizeX && sizeX > 70 ? 'vertical_svg' : 'transverse_svg'
    let [imgSrc,setImgSrc]=useState(String)
    const aginUpload=()=>{
        dispatch(backToUpload(true))
    }
    useEffect(() => {
        const {material,layer,silkscreen,solderMask}=pcbStandardField
        let newLayer=layer.substr(0,1)
        let defalutImgSrc=require(`../images/diagram/${material}${newLayer}${solderMask}${silkscreen}.png`)
        setImgSrc(defalutImgSrc)
    }, [])
        return(
            <>
            { isShow? 
                <>
                {svg !== null?
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
                            <div dangerouslySetInnerHTML={{ __html: svg?.topSvg }} className='svg_show_img'/> :
                            <div dangerouslySetInnerHTML={{ __html: svg?.bottomSvg }} className='svg_show_img'/>  
                        }
                    </div>
                    }
                    </>
                    :
                    <div className='show_default_img'>
                        <img src={imgSrc}/>
                    </div>
                }     
                </>
            : 
            <div className="show_default_img">
            <Spin tip="Img Loading..."/>
            </div>
            }
            </>
        )
}

export default GerberShow

