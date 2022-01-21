/*
 * @Author: aziz
 * @Date: 2021-12-20 14:58:08
 * @LastEditors: aziz
 * @LastEditTime: 2022-01-21 18:41:21
 * @Description: file content
 */
import React from 'react'
import ReactDomServer from 'react-dom/server'
import { dom as faDom } from '@fortawesome/fontawesome-svg-core'

import App from './App'

import faviconIco from './images/favicon.ico'
import favicon16 from './images/favicon-16x16.png'
import favicon32 from './images/favicon-32x32.png'
import favicon64 from './images/favicon-64x64.png'
import faviconNew from './images/logo2.ico'
import { any } from 'core-js/fn/promise'

type Props = {
    htmlWebpackPlugin: {
        options: {
            title: string
            description: string
            author: string
        }
    }
}

export default function StaticTemplate(props: Props): string {
    const { options } = props.htmlWebpackPlugin

    return `<!doctype html>${ReactDomServer.renderToStaticMarkup(
        <html lang="en" className="h-100 lh-solid">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="description" content={options.description} />
                <meta name="author" content={options.author} />
                <title>{options.title}</title>
                <link rel="shortcut icon" href={faviconNew} />
                <link rel="icon" type="image/png" sizes="16x16" href={faviconNew} />
                <link rel="icon" type="image/png" sizes="32x32" href={faviconNew} />
                <link rel="icon" type="image/png" sizes="32x32" href={faviconNew} />
                <style>{faDom.css()}</style>
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-3V6Y7YZNEE"></script>
                <script type="text/javascript" src='./Analysis/ga.js'> </script>
                <script src="https://embed.tawk.to/5c8511c8c37db86fcfccf818/default" async ></script>
                <script src="https://www.dwin1.com/19038.js" type="text/javascript" async defer></script>
                
            </head>
            <body className="h-100 overflow-hidden">
                <div
                    id="root"
                    data-hook="root"
                    className="h-100"
                    dangerouslySetInnerHTML={{
                        __html: ReactDomServer.renderToString(<App />),
                    }}
                />
            </body>
        </html>
    )}`
}
