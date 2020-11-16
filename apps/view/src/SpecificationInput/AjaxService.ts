import Axios from "axios";
import Cookies from 'js-cookie';

//线上
export const baseUrl = "https://www.pcbonline.com/"
//线下
// export const baseUrl = "http://localhost:8888/"
// export const uploadUrl = "http://localhost:8888/"
const testUrl = "https://sys.pcbonline.com"
// const testUrl = "http://localhost:8882"
// export function ajaxBuildTime (){
//     return Axios.get(baseUrl+ 'quote/getBuildTime')
// }

let token = Cookies.get('token');
// console.log(token);
export const ajaxBuildTime = (data: any) =>{
    return Axios.get(baseUrl + `quote/getBuildTime?areaSq=${data.areaSq}&layerNum=${data.layerNum}`);
}

export const ajaxSubtotal = (data: any) =>{
    return Axios.request({
        url: baseUrl+'quote/countAdditionInfoV2',
        method: 'post',
        data: data,
        withCredentials: true
    })
}

export const fetchShipingCost = (data: any) =>{
    return Axios.get(baseUrl + `quote/getShippingCost?courierId=1&countryId=${data.countryId}&totalWeight=${data.totalWeight}`);
}

export const ajaxAddQuote = (data: any) => {
    return Axios.request({
        headers:{'Authorization':token},
        url:testUrl+'/api/order',
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

    // todo 测试 headers:{'Content-Type': 'multipart/form-data','Authorization':token},
    return Axios.request({
        headers:{'Content-Type': 'multipart/form-data','Authorization':token},
        method: 'post',
        data: fromData,
        url: testUrl + '/api/file/upload/zip',
        withCredentials: true
    })
}
