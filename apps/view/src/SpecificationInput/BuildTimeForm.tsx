import React, { useState, useEffect } from 'react'
import { ClockCircleFilled } from '@ant-design/icons'
import { Row, Typography, Radio } from 'antd';
import { BuildTimeItem } from '../types';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useAppState, changeUrgentCost } from '../state';
import echarts from 'echarts'
import { render } from 'enzyme';
import img from '../images/15.png'
import Item from 'antd/lib/list/Item';

interface BuildTimeFormProps {
    buildItems: Array<BuildTimeItem>
}

const bts = [
    { id: 1, dayNumber: "3day", price: 0 },
    { id: 2, dayNumber: "48hours", price: 22 },
    { id: 3, dayNumber: "24hours", price: 38 },
]
const { Title, Text } = Typography
var chooseIndex;
let newChoose = 0;
const BuildTimeForm: React.FC<BuildTimeFormProps> = (props) => {
    let btnIndex = 0;
    const { buildItems } = props
    const [newChoose, changeChoose] = useState(0)
    const [newBtnID, changeId] = useState(1)
    const { dispatch, subtotal } = useAppState();
    const [isHeightLight, changeStateHeight] = useState(false)
    const onChange = (e: RadioChangeEvent) => {
        var v = e.target.value
        const { price } = buildItems.filter((item) => { return Number(item.id) === Number(v) })[0]
        dispatch(changeUrgentCost(price))
        btnIndex = v
        changeId(v)
    }

    //加载环形图的位置
    useEffect(() => {
        let myChart = echarts.init(document.getElementById('main'));
        let data = [{
            'name': 'Standard',
            'value': 1500,
            label: {
                color: '#fff'
            }
        }, {
            'name': 'Overnight',
            'value': 1500,
            label: {
                color: '#fff'
            }
        }, {
            'name': 'Priorigt',
            'value': 1500,
            label: {
                color: '#fff'
            }
        }];
        let option = {
            series: [{
                name: '消费',
                type: 'pie',
                center: ['50%', '50%'], //饼图位置
                radius: ['30%', '64%'], //饼图大小
                label: {
                    normal: {
                        position: 'inner',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#dce3ff',
                        borderWidth: 2,
                        borderColor: '#fff'
                    },
                    emphasis: {
                        color: '#2952ea',
                        borderWidth: 0,
                    }
                },
                data: data,
            }]
        };
        myChart.setOption(option);
        // 默认高亮显示
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });

        // //鼠标移入时的操作
        // myChart.on('mouseover', function (params) {
        //     myChart.dispatchAction({
        //         type: 'downplay',
        //         seriesIndex: 0,
        //         dataIndex: 0
        //     });
        //     myChart.dispatchAction({
        //         type: 'highlight',
        //         seriesIndex: 0,
        //         dataIndex: params.dataIndex
        //     });
        //     rotating(params)
        // });

        // //鼠标移出去的操作
        // myChart.on('mouseout', function (e) {
        //     const { seriesIndex, dataIndex } = e || ''
        //     if (e.dataIndex != chooseIndex) {
            
        //         myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex });
        //     }
        //     chooseIndex = e.dataIndex
        //     let LightState = isHeightLight ? chooseIndex : 0
        //     myChart.dispatchAction({
        //         type: 'highlight',
        //         seriesIndex: 0,
        //         dataIndex: chooseIndex,
        //     });

        // });
        //鼠标单击操作
        myChart.on('click', function (params) {
            if (params.dataIndex != chooseIndex) {
                myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex });
            }
            chooseIndex = params.dataIndex
            myChart.dispatchAction({ type: 'highlight', seriesIndex: chooseIndex, dataIndex: chooseIndex });
            rotating(params)
            changeChoose(chooseIndex)
            let numSort = changeNumSort(chooseIndex)
            changeId(numSort)
            changeStateHeight(true)
        });
        /**
        * @description:箭头图片进行一个旋转
        * @param :旋转父元素的值
        * @return: none
        */
        function rotating(params) {
            let el = document.querySelector('.point')
            const { name } = params.data
            if (name) {
                switch (name) {
                    case 'priorigt':
                        el.style.transform = 'rotate(-50deg)'
                        //changeNum(1)
                        break;
                    case 'standard':
                        el.style.transform = 'rotate(-270deg)'
                        //changeNum(3)
                        break;
                    case 'Surface':
                        el.style.transform = 'rotate(-180deg)'
                        //changeNum(2)
                        break;
                    default:
                        break
                }
            }
        }
        myChart.on('click', function (params) {
            if (params.dataIndex != chooseIndex) {
                myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex });
            }
            chooseIndex = params.dataIndex
            myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: params.dataIndex });
            rotating(params)
        });

    }, [])
    /**
     * @description: build time参数的顺序是混乱的，在以后的一个旋转中需要对应的参数，这里是将参数合理化，正常化
     * @param :e:用户交互时单击的按钮，获取到相应的value值
     * @return: 调整后的一个参数
    */
    function changeNumSort(n) {
        switch (n) {
            case 0:
                return 1
            case 1:
                return 3
            case 2:
                return 2
            default:
                break
        }
    }
    /**
     * @description: build time 底部按钮单击的时候，图片的颜色跟随着改变，旋转
     * @param :e:用户交互时单击的按钮，获取到相应的value值
     * @return: none
    */
    function changeColor(e) {
        let myChart = echarts.init(document.getElementById('main'));
        let el = document.querySelector('.point')
        const { value } = e.target || 0
        let temporaryVariable = 0;
        switch (value) {
            case 1:
                temporaryVariable = 0
                el.style.transform = 'rotate(-50deg)'
                break;
            case 2:
                temporaryVariable = 2;
                el.style.transform = 'rotate(-180deg)'
                break;
            case 3:
                temporaryVariable = 1;
                el.style.transform = 'rotate(-270deg)'
                break;
            default:
                break
        }
        if (temporaryVariable != chooseIndex) {
            myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex });
        }
        chooseIndex = temporaryVariable
        myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: temporaryVariable });
    }
    function isChecked(id) {
        if ((id === 1 && newChoose === 0) && id === newBtnID) {
            return true
        } else if ((id === 2 && newChoose === 2) && id === newBtnID) {
            return true
        } else if ((id === 3 && newChoose === 1) && id === newBtnID) {
            return true
        } else {

        }
        return false
    }
    return (
        <div>
            <Row>
                <Title level={3}><ClockCircleFilled /><b>Build Time</b></Title>
            </Row>
            <Row>
                <div style={{ width: "100px", height: "300px", position: 'relative' }}>
                    <div id="main" style={{ width: 291, height: 291 }}></div>
                    <img src={img} alt='404' style={{ position: 'absolute', top: '125px', left: '128px' }} className='point' />
                </div>
            </Row>
            <Row>
                <Radio.Group onChange={onChange} defaultValue={buildItems[0].id} className='group'>
                    {
                        buildItems.map(item => (
                            <Radio.Button value={item.id} key={item.id} onChange={e => changeColor(e)} checked={isChecked(item.id) ? true : false}> {item.dayNumber}</Radio.Button>
                        ))
                    }
                </Radio.Group>
            </Row>
            <Row className="ant-row-cont">
                <Text>quickturn charge</Text>
                <Text><b>${subtotal.urgentFee}</b></Text>
            </Row>
        </div>
    )
}
BuildTimeForm.defaultProps = { buildItems: bts }

export default BuildTimeForm;