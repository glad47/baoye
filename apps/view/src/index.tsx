// @tracespace/view entry point
import React from 'react'
import './styles'
import { createBrowserHistory } from "history";
import {Router, Switch, Redirect, Route} from "react-router-dom";
import FrontendAuth from "./Router/FrontendAuth";
import routerMap from "./Router/routerMap";

const hist = createBrowserHistory();

// @ts-ignore: https://github.com/microsoft/TypeScript/issues/33752
Promise.all([
  import('react-dom'),
  import('./state/StoreProvider'),
  import('react-router-dom'),
]).then((imports: any) => {
  const [
    {default: ReactDom},
    {default: StoreProvider},
  ] = imports

  ReactDom.hydrate(
      <StoreProvider>
        <Router history={hist}>
          <Switch>
            <FrontendAuth routerConfig={routerMap} location={null}/>
          </Switch>
        </Router>,
      </StoreProvider>,
      document.getElementById('root')
  )
})
