import React, {useEffect, useState} from 'react';
import {Dropdown, Checkbox, Tooltip, Input, Space, message} from 'antd';
import {DownOutlined, TransactionOutlined} from "@ant-design/icons";
import {DescribeCoupon, GetCoupon} from "../../../SpecificationInput/AjaxService";
import moment from 'moment'
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
    const [couponList, setCouponList] = useState<[couponEntity]>([{}]);
    const [couponChecked, setCouponChecked] = useState<any>();
    const [visible, setVisible] = useState<boolean>();

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
                if (code === '3008') {
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
        setVisible(false);
        if (couponChecked === id) { // 单选
            setCouponChecked(null);
        } else {
            setCouponChecked(id);
        }
    }

    const menu = (
        <div className="coupon-box">
            {
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
                ))
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
                        <Dropdown visible={visible} placement="bottomCenter" arrow overlay={menu} trigger={['click']}>
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
                <span className="coupon-txt">-${couponList.find(item => item.id === couponChecked)?.couponMoney  || 0}</span>
            </div>
        </div>
    </>)
}

export default CarCoupon;