import Axios from "axios";

const baseUrl = "http://localhost:8871/"

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
        url: baseUrl + '',
        method: 'post',
        data: data
    })
}