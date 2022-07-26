import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {BillboardProvider} from "./context/BillboardContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BillboardProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BillboardProvider>
)
