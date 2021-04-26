import App from "../App";
import TestCom from "../testCom";
import PcbOrderProcess from "../SpecificationInput/PcbOrderProcess";

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
    }
]
export default routerMap;
