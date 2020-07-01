import Axios from "axios";

//线上
export const baseUrl = "https://www.pcbonline.com/"
export const gerberUploadUrl = "http://47.89.176.26:8888/";
//线下
// export const baseUrl = "http://192.168.0.181:8871/"
// export const gerberUploadUrl = "http://192.168.0.181:8888/";

// export function ajaxBuildTime (){
//     return Axios.get(baseUrl+ 'quote/getBuildTime')
// }

export const ajaxBuildTime = (data: any) =>{
    return Axios.get(baseUrl + `quote/getBuildTime?areaSq=${data.areaSq}&layerNum=${data.layerNum}`);
}

export const ajaxSubtotal = (data: any) =>{
    return Axios.request({
        url: baseUrl+'quote/countAdditionInfoV2',
        method: 'post',
        data: data
    })
}

export const fetchShipingCost = (data: any) =>{
    return Axios.get(baseUrl + `quote/getShippingCost?courierId=1&countryId=${data.countryId}&totalWeight=${data.totalWeight}`);
}

export const ajaxAddQuote = (data: any) => {
    return Axios.request({
        url:'/cart/addQuoteV2',
        method: 'post',
        data: data
    })
}

export const ajaxAssemblyCast = (data: any)=>{
    console.log(data);
    return Axios.get(baseUrl + `quote/getAssemblyQuote?assemblyType=${data.assemblyType}&uniquePartNum=${data.uniquePartNum}&smtPartNum=${data.smtPartNum}&throughHolePartNum=${data.throughHolePartNum}&assemblySide=${data.assemblySide}&quantity=${data.quantity}`);
}

export const ajaxFileUpload = (file: File[]) =>{
    const fromData = new FormData();
    fromData.append('file',file[0]);

    return Axios.request({
        headers:{'Content-Type': 'multipart/form-data',},
        method: 'post',
        data: fromData,
        url: baseUrl + 'quote/upload'
    })
}
