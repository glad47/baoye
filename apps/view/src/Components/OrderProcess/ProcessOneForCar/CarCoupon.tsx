import React, {useEffect} from 'react';
import { Dropdown, Checkbox  } from 'antd';
import {DownOutlined} from "@ant-design/icons";
import {DescribeCoupon} from "../../../SpecificationInput/AjaxService";

const CarCoupon:React.FC<any> = props => {
    useEffect(() => {
        let userInfo: any = sessionStorage.getItem("userAllInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            const {id} = userInfo
            DescribeCoupon(id).then(res => {
                console.log('rescou', res)
            })
        }
    }, [])
    const cop = [1,2,3];
    const menu = (
        <div className="coupon-box">
            {
                cop.map((item, inx) => (
                    <div className="coupon-item">
                        <div className="itm ck-bx">
                            <Checkbox />
                        </div>
                        <div className="itm price">
                            $100
                        </div>
                        <div className="itm desc">
                            <span className="des">Period of Validity</span>
                            <span className="time">2021.05.06-2022.05.06</span>
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