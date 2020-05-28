// @tracespace/view entry point
import React from 'react'
import './styles'
import { Router } from 'react-router-dom'

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
      <App />
      {/* </BrowserRouter> */}
    </StoreProvider>,
    document.querySelector('[data-hook=root]')
  )
})
