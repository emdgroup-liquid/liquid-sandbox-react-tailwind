import React from 'react'
import ReactDOM from 'react-dom'
import './font-faces.css'
import './liquid.globals.css'
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
