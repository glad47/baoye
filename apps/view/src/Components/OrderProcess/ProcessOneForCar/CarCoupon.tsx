import React, {useEffect, useState} from 'react';
import { Dropdown, Checkbox  } from 'antd';
import {DownOutlined} from "@ant-design/icons";
import {DescribeCoupon} from "../../../SpecificationInput/AjaxService";
import moment from 'moment'

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
    useEffect(() => {
        let userInfo: any = sessionStorage.getItem("userAllInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            const {id} = userInfo
            DescribeCoupon(id).then((res: any) => {
                setCouponList(res);
            })
        }
    }, [])
    const cop = [1,2,3];
    const menu = (
        <div className="coupon-box">
            {
                couponList.map((item, inx) => (
                    <div className="coupon-item">
                        <div className="itm ck-bx">
                            <Checkbox value={item.id}/>
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

        </div>
    );
    return (<>
        <div className="cost-det">
            <div>
                <span>Coupon(3)</span>
                <span>
                 <Dropdown placement="bottomCenter" overlay={menu} trigger={['click']}>
                     <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                         Discount code <DownOutlined />
                     </a>
                 </Dropdown>
                </span>
            </div>
            <div>
                <span>Coupon applied</span>
                <span className="coupon-txt">-$60.00</span>
            </div>
        </div>
    </>)
}

export default CarCoupon;