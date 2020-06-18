import React from "react";
import { useAppState } from "../state";
import { Fade } from "../ui";



interface GerberShowProps { }


//gerber显示组件
const GerberShow: React.FC<GerberShowProps> = (props) =>{
    const {loading,pcbSizeField:{singleSize:{sizeX}},svg,singleCopper} = useAppState()
    const SIZE_CLASS_NAME = sizeX && sizeX > 70 ? 'vertical_svg_first' : 'transverse_svg_first'
    const SIZE_FIRST_CLASS_NAME = sizeX && sizeX > 70 ? 'vertical_svg' : 'transverse_svg'

    // const topSvg = board?.top ? board.top : ''
    // const bottomSvg = board?.bottom ? board.bottom : '';
    if(loading){
        return(
            <>
                {singleCopper == null ?<div className={SIZE_FIRST_CLASS_NAME}>
                    <div className={SIZE_CLASS_NAME}>
                        <div dangerouslySetInnerHTML={{ __html: svg?.topSvg.svg }} />
                    </div>
                    <div className={SIZE_CLASS_NAME}>
                        <div dangerouslySetInnerHTML={{ __html: svg?.bottomSvg.svg }} />
                    </div>
                </div> :
                <div className='show_one_img'>
                    {singleCopper === 'top' ?
                        <div dangerouslySetInnerHTML={{ __html: svg?.topSvg.svg }} className='svg_show_img'/> :
                        <div dangerouslySetInnerHTML={{ __html: svg?.bottomSvg.svg }} className='svg_show_img'/>  
                    }
                </div>
                }
            </>
        )
    }else{
       return null
    }
}

export default GerberShow

