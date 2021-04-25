import { Route} from 'react-router-dom'
import * as React from "react";

const FrontendAuth = (props: { location: any; routerConfig: any; }) => {
    const { location, routerConfig } = props;
    const { pathname } = location;

    const targetRouterConfig = routerConfig.find(
        (item: { path: any; }) => {
            return item.path === pathname
        }
    );
    return <Route path={pathname} component={targetRouterConfig.component} exact={!!targetRouterConfig.exact} />
}

export default FrontendAuth;
