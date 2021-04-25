// @tracespace/view entry point
import React from 'react'
import './styles'
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import FrontendAuth from "./Router/FrontendAuth";
import routerMap from "./Router/routerMap";

const hist = createBrowserHistory();

// @ts-ignore: https://github.com/microsoft/TypeScript/issues/33752
Promise.all([
  import('react-dom'),
  import('./App'),
  import('./state/StoreProvider'),
  import('react-router-dom')
]).then((imports: any) => {
  const [
    {default: ReactDom},
    {default: App},
    {default: StoreProvider},
    {default: BrowserRouter},
  ] = imports

  ReactDom.hydrate(
      <StoreProvider>
        {/* <BrowserRouter> */}
        <Router history={hist}>
          <Switch>
            <FrontendAuth routerConfig={routerMap} location={null}/>
          </Switch>
          <App />
        </Router>,
        {/* </BrowserRouter> */}
      </StoreProvider>,
    document.querySelector('[data-hook=root]')
  )
})
