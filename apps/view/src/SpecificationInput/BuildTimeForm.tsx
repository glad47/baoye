import React, { useState, useEffect, useRef } from 'react'
import { ClockCircleFilled } from '@ant-design/icons'
import { Row, Typography, Radio, Spin } from 'antd';
import { BuildTimeItem } from '../types';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useAppState, changeUrgentCost } from '../state';
// import echarts from 'echarts'
import { render } from 'enzyme';
import img from '../images/15.png'

interface BuildTimeFormProps {
    buildItems: Array<BuildTimeItem>
}

var echarts = require('../../../../node_modules/echarts')
const bts = [
    { id: 1, dayNumber: "3 day", price: 0 },
    { id: 2, dayNumber: "48 hours", price: 22 },
    { id: 3, dayNumber: "24 hours", price: 38 },
]
const { Title, Text } = Typography
var chooseIndex: number;
let newChoose = 0;
const BuildTimeForm: React.FC<BuildTimeFormProps> = (props) => {
    let btnIndex = 0;
    const { buildItems } = props
    const [newChoose, changeChoose] = useState(0)
    const [newBtnID, changeId] = useState(1)
    const [isFinish, setIsFinish] = useState(false)
    const { dispatch, subtotal, buildTimeItmes } = useAppState();
    const [isHeightLight, changeStateHeight] = useState(false)

    const onChange = (e: RadioChangeEvent) => {
        var v = e.target.value
        const { price, dayNumber, id } = buildTimeItmes.filter((item) => { return Number(item.id) === Number(v) })[0]
        let buildTimeItem: BuildTimeItem = { id: id, price: price, dayNumber: dayNumber }
        dispatch(changeUrgentCost(buildTimeItem))
        btnIndex = v
        changeId(v)
    }

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
            'name': 'Prior night',
            'value': 1500,
            label: {
                color: '#fff'
            }
        }];
        let option = {
            series: [{
                name: '消费',
                type: 'pie',
                center: ['51%', '49%'], //饼图位置
                radius: ['23%', '64%'], //饼图大小
                label: {
                    normal: {
                        position: 'inner',
                        textStyle: {
                            color: '#fff',
                            fontSize: 12
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
                animation: true
            }]
        };
        myChart.setOption(option);
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });

        myChart.on('click', function (params) {
            if (params.dataIndex != chooseIndex) {
                myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex });
            }
            chooseIndex = params.dataIndex;
            myChart.dispatchAction({ type: 'highlight', seriesIndex: chooseIndex, dataIndex: chooseIndex });
            rotating(params)
            changeChoose(chooseIndex)
            let numSort = changeNumSort(chooseIndex)
            changeId(numSort)
            changeStateHeight(true)
            let getId = 0
            switch (numSort) {
                case 1:
                    getId = 0
                    break;
                case 2:
                    getId = 1
                    break;
                case 3:
                    getId = 2
                    break;
                default:
                    break;
            }
            const { price, dayNumber, id } = buildItems[getId]
            let buildTimeItem: BuildTimeItem = { id: id, price: price, dayNumber: dayNumber }
            dispatch(changeUrgentCost(buildTimeItem))
        });
        function rotating(params) {
            let el = document.querySelector('.point')
            const { name } = params.data
            if (name) {
                switch (name) {
                    case 'Standard':
                        el.style.transform = 'rotate(-50deg)'
                        break;
                    case 'Overnight':
                        el.style.transform = 'rotate(-270deg)'
                        break;
                    case 'Prior night':
                        el.style.transform = 'rotate(-180deg)'
                        break;
                    default:
                        el.style.transform = 'rotate(-50deg)'
                        break
                }
            }
        };

        myChart.on('click', function (params) {
            if (params.dataIndex != chooseIndex) {
                myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex });
            }
            chooseIndex = params.dataIndex
            myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: params.dataIndex });
            rotating(params)
            changeChoose(chooseIndex)
        });
        myChart.on('rendered', function () {
            setIsFinish(true)
        });
        return () => {
            myChart.dispose()
        }
    }, [buildItems])

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

    function changeColor(e, index: number) {
        let myChart = echarts.init(document.getElementById('main'));
        let el = document.querySelector('.point')
        const { value } = e.target || 0
        let temporaryVariable = 0;
        switch (index) {
            case 0:
                temporaryVariable = 0
                el.style.transform = 'rotate(-50deg)'
                break;
            case 1:
                temporaryVariable = 2;
                el.style.transform = 'rotate(-180deg)'
                break;
            case 2:
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

    function isChecked(id: number) {
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
        <div className='mobile-build-time-style'>
            <Row className='mobile-build-title'>
                <Title level={3}><ClockCircleFilled /><b>Build Time</b></Title>
            </Row>
            <Row>
                <div style={{ width: "291px", height: "300px", position: 'relative' }} className='mobile-echarts-drag'>
                    <div id="main" style={{ width: 291, height: 291 }}></div>
                    {isFinish ? <img src={img} alt='404' style={{ position: 'absolute', top: '125px', left: '128px' }} className='point' /> : ""}
                    {!isFinish ? <div className='show_default'><img src={require('../images//default_img_show.png')} /></div> : ""}
                </div>
            </Row>
            <Row className='mobile-build-time-button'>
                <Radio.Group onChange={onChange} defaultValue={buildTimeItmes[0].id} className='group' name={'1'}>
                    {
                        buildTimeItmes.map((item, index) => (
                            <Radio.Button value={item.id} key={item.id} onChange={e => changeColor(e, index)} checked={isChecked(index + 1) ? true : false}> {item.dayNumber}</Radio.Button>
                        ))
                    }
                </Radio.Group>
            </Row>
            <Row className="ant-row-cont">
                <Text>Quick turn Price</Text>
                <Text><b>${subtotal.urgentFee}</b></Text>
            </Row>
        </div>
    )
}
BuildTimeForm.defaultProps = { buildItems: bts }

export default BuildTimeForm;