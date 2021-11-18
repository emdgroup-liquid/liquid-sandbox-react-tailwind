import React from 'react'
import ReactDOM from 'react-dom'
import '@emdgroup-liquid/liquid/dist/css/liquid.css'
import 'tailwindcss/tailwind.css'
import { setAssetPath } from '@emdgroup-liquid/liquid'
import App from './App'

setAssetPath(window.location.origin)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
