import { Route} from 'react-router-dom'
import * as React from "react";
import routerMap from "./routerMap";

const FrontendAuth = (props: { location: any; routerConfig: any; }) => {
    const { location, routerConfig } = props;
    const { pathname } = location;

    const targetRouterConfig = routerConfig.find(
        (item: { path: any; }) => {
            return item.path === pathname
        }
    ) || {...routerConfig.find(
            (item: { path: any; }) => {
                return item.path === "/"
            }
        )};
    return <Route path={pathname} key={pathname} strict component={targetRouterConfig.component} exact={!!targetRouterConfig?.exact} />
}

export default FrontendAuth;
