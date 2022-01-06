import React from 'react'
import ReactDOM from 'react-dom'
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
import 'tailwindcss/tailwind.css'
import { setAssetPath } from '@emdgroup-liquid/liquid/dist/components'
import App from './App'

setAssetPath(window.location.origin)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
