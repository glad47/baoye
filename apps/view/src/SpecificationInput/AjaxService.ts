import Axios from "axios";

export const baseUrl = "http://localhost:8871/"
export const gerberUploadUrl = "http://localhost:8888/";
// export function ajaxBuildTime (){
//     return Axios.get(baseUrl+ 'quote/getBuildTime')
// }

export const ajaxBuildTime = (data: any) =>{
    return Axios.get(baseUrl + `quote/getBuildTime?areaSq=${data.areaSq}&layerNum=${data.layerNum}`);
}

export const ajaxSubtotal = (data: any) =>{
    return Axios.request({
        url: baseUrl+ 'quote/countAdditionInfoV2',
        method: 'post',
        data: data
    })
}

export const fetchShipingCost = (data: any) =>{
    return Axios.get(baseUrl + `quote/getShippingCost?courierId=1&countryId=${data.countryId}&totalWeight=${data.totalWeight}`);
}

export const ajaxAddQuote = (data: any) => {
    return Axios.request({
        url: baseUrl + 'quote/addQuoteV2',
        method: 'post',
        data: data
    })
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