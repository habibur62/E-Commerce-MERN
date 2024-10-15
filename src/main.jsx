import * as React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import router from './routers'
import { store } from './store/store'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>

    <RouterProvider router={router} />

    </Provider>

  </React.StrictMode>
)
