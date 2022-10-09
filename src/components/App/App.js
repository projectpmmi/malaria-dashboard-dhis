import React from 'react'
import { CssReset } from '@dhis2/ui-core'
import { Provider } from '@dhis2/app-runtime'
import { HeaderBar } from '@dhis2/ui-widgets'
import { Main } from '../Main'
import 'typeface-roboto'
import './style.css'
import { number, string } from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import Content from './Content'

import { Header} from '../Header'
import 'typeface-roboto'

import 'bootstrap/dist/css/bootstrap.min.css';

const BodyStyle = createGlobalStyle`
    body {
        margin: 0;
        background-color: rgba(0,0,10,.05);
    }
`

export const App = ({ baseUrl, appName, apiVersion }) => (
    <>
        <BodyStyle />
        <CssReset />
        <Header baseUrl={baseUrl} appName={appName} apiVersion={apiVersion} />
        <Content />
    </>
)

App.propTypes = {
    baseUrl: string.isRequired,
    appName: string.isRequired,
    apiVersion: number.isRequired,
}
