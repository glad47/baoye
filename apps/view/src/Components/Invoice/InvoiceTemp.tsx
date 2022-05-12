import React, {useImperativeHandle} from "react";
import html2Canvas from "html2canvas";
import jsPDF from "jspdf";
import './invoice.css'

const InvoiceTemp:React.FC<any> = (props: any) => {
    const {invoiceData, cRef} = props;
    useImperativeHandle(cRef, () => ({
        toPDF() {
            outPDF('invoice');
        },
    }));
    const {assemblyVOList, orderVO, quoteVOList, receiverAddresVO, smlStencilVOS} = invoiceData;
    const outPDF = (str: string) => {
        //document.getElementById(str) 通过id获取要导出的元素
        // @ts-ignore
        html2Canvas(document.getElementById(str)).then(function (canvas) {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            // console.log("**********************************************")
            // console.log(contentWidth)
            // console.log(contentHeight)
            let pageHeight = (contentWidth / 592.28) * 650.89;
            let leftHeight = contentHeight;
            //页面偏移
            let position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            let imgWidth = 859.89;
            let imgHeight = (650.89 / contentWidth) * contentHeight;
            //表格太长，所以导出的是横向的A4
            let pageData = canvas.toDataURL("image/jpeg", 1.0);
            let pdf = new jsPDF("l", "pt", "a4");

            //放大会清晰一点
            pdf.internal.scaleFactor = 1;
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                    leftHeight -= pageHeight;
                    position -= 592.28;
                    //避免添加空白页
                    if (leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save(`invoice.pdf`);
        });
    };
    return (
        <div id='invoice'>
            <div className='mask' />
            <div className='invoice'>
                <div className='invoice_inner'>
                    <div className='head'>
                        {/*<span onClick={this.closeInvoiceWindows}><IconFont name='close' color={'black'} /></span>*/}
                    </div>
                    <div className='title'>
                        <div className='own'>
                            <div className='own-logo'><img src={require('../../images/inv_logo.png')} alt='logo' /></div>
                            <div><span>Importer:</span><span>  Dean Wright</span></div>
                            <div><span>Company: </span><span>  Rapid PCB, LLC</span></div>
                            <div><span>Add: </span> <span>Add:  11601 W. HWY 290 #A101Austin, TX 78737 U.S .A.,Austin,United States</span></div>
                            <div><span>Telephone:</span> <span>87 7-887-5777</span></div>
                            <div><span>Zip/Code:</span><span>  78737</span></div>
                        </div>
                        <div className='other'>
                            <div><strong>INVOICE</strong></div>
                            <div><span>INVOICE NO:</span><span> {orderVO.orderno}</span></div>
                            <div><span>ORDER NO:</span><span> {orderVO.orderno}</span></div>
                            <div><span>PAYMENT TE RM:</span><span> TT 100%</span></div>
                            <div><span>DESTINATION:</span><span> United States</span></div>
                            <div><span>PRODUCT ORIGIN: </span><span> China</span></div>
                        </div>
                    </div>

                    <div className='detail'>
                        <table border={1} cellSpacing={0}>
                            <thead>
                            <tr>
                                <th>File Name</th>
                                <th>P/N&Description</th>
                                <th>QTY(pcs)</th>
                                <th>Unit<br />Price</th>
                                <th>Board<br />Charge</th>
                                <th>Engineering<br />Charge</th>
                                <th>Test<br />Charge</th>
                                <th>Expedited<br />Charge</th>
                                <th>Amount<br />(USD)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                quoteVOList.map((item: any) => (
                                    <tr>
                                        <td>{item.gerberName}</td>
                                        <td>
                                            <p>P/N: a2330001 9a<br /></p>
                                            <p>[PCB prototype]<br /></p>
                                            <p>{item.boardInformation}<br /></p>
                                            <p>1.6mm 4layer<br /></p>
                                            <p>Solder Mask:<br /></p>
                                            <p>green<br /></p>
                                            <p>HASL_ lead_ free<br /></p>
                                        </td>
                                        <td>{item.quantityPcs}</td>
                                        <td>{item.unitPrice}</td>
                                        <td>88.24</td>
                                        <td>{item.engineeringFee}</td>
                                        <td>{item.testCostFee}</td>
                                        <td>74.00</td>
                                        <td>{item.subtotal}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td className="blue">Freight</td>
                                <td className="blue">{orderVO.postFee}</td>
                                <td rowSpan={4} colSpan={3} className="blue">Total</td>
                                <td rowSpan={4} colSpan={4} className="blue">{orderVO.totalFee}</td>
                            </tr>
                            <tr>
                                <td className="blue">PayPal Fee</td>
                                <td className="blue">{orderVO.paypalFee}</td>
                            </tr>
                            <tr>
                                <td className="blue">Members</td>
                                <td className="blue">-{orderVO.disMemberStr}</td>
                            </tr>
                            <tr className="blue">
                                <td className="blue">Coupon</td>
                                <td>{orderVO.disCouponStr}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='info'>
                        <div className='checked'>
                            <div><span>1.</span><span>Please pays us by dollars</span></div>
                            <div><span>2.</span><span>The corresponding quotation NO.is</span></div>
                            <div><span>3.</span><span>Please note the invoice number in your payment information</span></div>
                            <div><span>4.</span><span>Please check the price. description. payment terms and other information.Any questions, please inform us immediate</span></div>
                        </div>
                        <div className='salesman'>
                            <div><span>{orderVO.businessName}</span><span>{orderVO.entTime}</span></div>
                            <div><span>Authorized By</span><span>Date: {new Date().getDate()}</span></div>
                        </div>
                    </div>

                    <div className='statement'>
                        <strong>PCB ONLINE LIMITED</strong>
                        <div className='website'>
                            <div className="website-left">
                                <div>
                                    <a href='www. pcbonline. com'>www. pcbonline. com</a>
                                    <a href='mailto:info@ pcbonline. com'> info@ pcbonline. com</a>
                                    <span>+86-755-273981 55</span>
                                    <span>+86-755-27398155</span>
                                </div>
                                <div>
                                    <span>Ansheng Road, No.4 Building </span>
                                    <span>Shajing, Baoan District,</span>
                                    <span>Shenzhen,</span>
                                    <span>China</span>
                                </div>
                            </div>
                            <div className="website-right">
                                <span>We serve customers with enthusiasm</span>
                                <span>We focus on speed and flexibility</span>
                                <span>We value teamwork for mutual goals</span>
                                <span>We adhere to honesty and integrity in business</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceTemp;