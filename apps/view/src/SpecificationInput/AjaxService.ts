import Axios from "axios";
import Cookies from 'js-cookie';
import service from "../request";

//线上
// export const baseUrl = "https://www.pcbonline.com/" //线上前端
// export const sysUrl = "https://sys.pcbonline.com/"  //线上后端
// 线下
export const baseUrl = "http://localhost:8083/base/" //网站前端
export const sysUrl = "http://localhost:8083/sys/"  //网站后端
// parker服务器配置地址
// export const baseUrl = "http://pcb.imcoding.top/base/" //网站前端
// export const sysUrl = "http://pcb.imcoding.top/sys/"  //网站后端
// export const uploadUrl = "http://localhost:8888/"

// export function ajaxBuildTime (){
//     return Axios.get(baseUrl+ 'quote/getBuildTime')
// }


// console.log(token);
export const ajaxBuildTime = (data: any) =>{
    return Axios.get(baseUrl + `v1/quote/getBuildTime?areaSq=${data.areaSq}&layerNum=${data.layerNum}`);
}

export const ajaxSubtotal = (data: any) =>{
    return Axios.request({
        url: baseUrl+'v1/quote/countAdditionInfoV2',
        method: 'post',
        data: data,
        withCredentials: true
    })
}

export const fetchShipingCost = (data: any) =>{
    // return Axios.get(baseUrl + `v1/quote/getShippingCost?courierId=1&countryId=${data.countryId}&totalWeight=${data.totalWeight}`);
    return service({
        url: `${baseUrl}v1/quote/getShippingCost?courierId=${data.courierId}&countryId=${data.countryId}&totalWeight=${data.totalWeight}`,
        method: 'GET'
    })
}

export const ajaxAddQuote = (data: any) => {
    const token = Cookies.get('token');
    return Axios.request({
        headers:{'Authorization':token},
        url:sysUrl+'api/order',
        method: 'post',
        data: data
    })
}

export const ajaxAssemblyCast = (data: any)=>{
    console.log(data);
    return Axios.get(baseUrl + `v1/quote/getAssemblyQuote?assemblyType=${data.assemblyType}&uniquePartNum=${data.uniquePartNum}&smtPartNum=${data.smtPartNum}&throughHolePartNum=${data.throughHolePartNum}&assemblySide=${data.assemblySide}&quantity=${data.quantity}`);
}

export const ajaxFileUpload = (file: File[]) =>{
    const token = Cookies.get('token');
    const fromData = new FormData();
    fromData.append('file',file[0]);

    // todo 测试 headers:{'Content-Type': 'multipart/form-data','Authorization':token},
    return Axios.request({
        headers:{'Content-Type': 'multipart/form-data','Authorization':token},
        method: 'post',
        data: fromData,
        url: sysUrl + 'api/file/upload/zip',
        withCredentials: true
    })
}


/**
 * pcb 订单列表
 * @param data
 */
export const ajaxCarList = (data: any) => {
    return service({
        url: `${sysUrl}api/quote/query`,
        method: 'post',
        data: data
    });
}

/**
 * 删除pcb订单
 * @param id
 */
export const delPcbOrder = (id: number) => {
    return service({
        url: `${sysUrl}api/quote/${id}`,
        method: 'delete'
    })
}

/**
 * 修改pcb订单
 * @param id
 * @param data
 */
export const editPcbOrder = (id: number, data: object) => {
    return service({
        url: `${sysUrl}api/quote/${id}`,
        method: 'put',
        data: data
    })
}


/**
 * 收货地址 => 列表
 */
export const getDeliveryAddress = () => {
    return service({
        url: `${sysUrl}api/receiveraddress?pageNo=1&pageSize=100`,
        method: 'GET'
    })
}


/**
 * 收货地址 => 删除
 * @param id
 */
export const delDeliveryAddress = (id: number) => {
    return service({
        url: `${sysUrl}/api/receiveraddress/${id}`,
        method: 'DELETE'
    })
}


/**
 * 收货地址 => 修改
 * @param id
 */
export const modifyDeliveryAddress = (data: any) => {
    const {id} = data;
    return service({
        url: `${sysUrl}/api/receiveraddress/${id}`,
        method: 'PUT',
        data: data
    })
}


/**
 * 获取运输方式
 * @constructor
 */
export const DescribeCouriers = () => {
    return service({
        url: `${baseUrl}v1/quote/getCouriers`,
        method: 'GET'
    })
}


/**
 * 获取所有国家信息
 */
export const getAllCountry = () => {
    return service({
        url: `${sysUrl}/api/country/all`,
        method: 'GET'
    })
}

/**
 * 信用卡支付
 * @param params
 */
export const orderPay = (params: any) => {
    return service({
        url: `https://test-gateway.ginltech.com/payment/interface/do?${params}`
    })
}

// export const getShippingCost = () => {
//     return service({
//         url: `${sysUrl}/api/country/all`,
//         method: 'GET'
//     })
// }