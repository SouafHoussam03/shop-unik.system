import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'

import router from './routes'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <HelmetProvider>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </HelmetProvider>
)

reportWebVitals()
