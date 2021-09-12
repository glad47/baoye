import React, {useEffect, useState} from 'react';
import {Dropdown, Checkbox, Tooltip, Input, Space, message} from 'antd';
import {DownOutlined, TransactionOutlined} from "@ant-design/icons";
import {DescribeCoupon, GetCoupon} from "../../../SpecificationInput/AjaxService";
import moment from 'moment'
import {orderSummaryFun, useAppState} from "../../../state";
const { Search } = Input;

interface couponEntity {
    couponCode?: string,
    couponMoney?: number,
    couponStatus?: number,
    endTime?: number,
    id?: number,
    startTime?: number
}

const CarCoupon:React.FC<any> = props => {
    const { orderSummary, orderSummaryStatus, dispatch } = useAppState();
    const [couponList, setCouponList] = useState<[couponEntity]>([{}]);
    const [couponChecked, setCouponChecked] = useState<any>();
    const [visible, setVisible] = useState<boolean>();
    const [couponMoney, setCouponMoney] = useState<any>();

    useEffect(() => {
        getCouponList();
    }, [])

    // 兑换优惠券
    const handlerGetCoupon = (code: any) => {
        GetCoupon(code).then((res: any) => {
            if (!res) {
                message.error('error');
            } else {
                const {code, message:msg, result} = res;
                debugger
                if (code === '3008' || code === '3007') {
                    message.error(msg);
                } else {
                    message.success('兑换成功');
                    getCouponList();
                }
            }
        })
    }

    // 优惠券列表
    const getCouponList = () => {
        let userInfo: any = sessionStorage.getItem("userAllInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            const {id} = userInfo
            DescribeCoupon(id).then((res: any) => {
                setCouponList(res);
            })
        }
    }

    // 选中优惠券
    const handleCouponChecked = (id: any) => {
        console.log('orderSummary===>', orderSummary)
        setVisible(false);
        let _coup: any = 0;
        if (couponChecked === id) { // 单选
            setCouponChecked(null);
        } else {
            _coup = couponList.find(item => item.id === id)?.couponMoney;
            setCouponChecked(id);
        }
        dispatch(orderSummaryFun({coupon: {id: id, value: _coup}}));
        setCouponMoney(_coup);
    }

    const menu = (
        <div className="coupon-box">
            {
                couponList.length > 0 ?
                couponList.map((item, inx) => (
                    <div className="coupon-item" key={`coupon_item${inx}`} onClick={() => handleCouponChecked(item.id)}>
                        <div className="itm ck-bx">
                            <Checkbox value={item.id} checked={item.id === couponChecked} />
                        </div>
                        <div className="itm price">
                            ${item.couponMoney}
                        </div>
                        <div className="itm desc">
                            <span className="des">Period of Validity</span>
                            <span className="time">${moment(item.startTime).format('l')}-${moment(item.endTime).format('l')}</span>
                        </div>
                    </div>
                )) : <div>No Coupons</div>
            }
            <div className="exchange-coupon">
                <Search
                    placeholder="Exchange code"
                    allowClear
                    enterButton={(
                        <>
                            <Space>
                                Submit
                                <TransactionOutlined />
                            </Space>
                        </>
                    )}
                    size="large"
                    onSearch={handlerGetCoupon}
                />
            </div>
        </div>
    );
    return (<>
        <div className="cost-det">
            <div>
                <span>Coupon({couponList.length})</span>
                <span>
                    {
                        couponList.length > 0 &&
                        <Dropdown
                            visible={visible}
                            placement="bottomCenter"
                            arrow
                            disabled={orderSummaryStatus.process > 4}
                            overlay={menu}
                            trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <Tooltip title="To use the coupon code, it needs to be redeemed into a coupon. Enter the code below and click the 'Apply' button. Then the coupon will be automatically generated.">
                                    <div onClick={() => setVisible(!visible)}>
                                        Discount code <DownOutlined />
                                    </div>
                                </Tooltip>
                            </a>
                        </Dropdown>
                    }
                </span>
            </div>
            <div>
                <span>Coupon applied</span>
                <span className="coupon-txt">-${couponMoney  || 0}</span>
            </div>
        </div>
    </>)
}

export default CarCoupon;