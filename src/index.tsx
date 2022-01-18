import React from 'react'
import ReactDOM from 'react-dom'
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import 'tailwindcss/tailwind.css'
import App from './App'

// @ts-ignore
window.__LD_ASSET_PATH__ = window.location.origin + '/liquid/'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
