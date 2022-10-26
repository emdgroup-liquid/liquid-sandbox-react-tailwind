import App from './App'
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
import React from 'react'
import ReactDOM from 'react-dom'
import 'tailwindcss/tailwind.css'

// @ts-ignore
window.__LD_ASSET_PATH__ = window.location.origin + '/liquid/'

defineCustomElements()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
