/*
 * @Descripttion: 购物车中判断勾选订单
 * @version: 1.0
 * @Author: 
 * @Date: 2021-07-17 11:10:06
 * @LastEditors: ho huang
 * @LastEditTime: 2021-09-03 23:35:01
 */
import {message} from "antd";

/**
 * 订单流程 检测函数
 */
const FlagProcess = {
    /**
     * 判断是否勾选订单
     * @constructor
     */
    CheckItems: (orderOptionsItem: { ordersItem: any }) => {
        const {ordersItem} = orderOptionsItem;
        if (ordersItem.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    CheckAddress: () => {

    }
}

export default FlagProcess;