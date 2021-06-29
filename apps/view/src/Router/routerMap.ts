import App from "../App";
import TestCom from "../testCom";
import PcbOrderProcess from "../SpecificationInput/PcbOrderProcess";
import PaySuccessful from "../SpecificationInput/PaySuccessful";
import allMessages from "../SysMessages";

const routerMap = [
    {
        path: '/',
        component: App,
        auth: false,
        exact: true,
    },
    {
        path: '/test',
        component: TestCom,
        auth: false
    },
    {
        path: '/order',
        component: PcbOrderProcess,
        auth: false
    },
    {
        path: '/paySuc',
        component: PaySuccessful,
        auth: false
    },
    {
        path: '/allMessages',
        component: allMessages,
        auth: false
    }
]
export default routerMap;
