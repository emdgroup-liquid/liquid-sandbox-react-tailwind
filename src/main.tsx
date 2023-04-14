import App from './App'
import './index.css'
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
import React from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.__LD_ASSET_PATH__ = window.location.origin + '/liquid/'

defineCustomElements()

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
