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
            message.error('Please Checkout Order items');
            return false;
        }
    },
    CheckAddress: () => {

    }
}

export default FlagProcess;