import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom'
import Login from './login/logIn'
import Home from './pages/Home'
import App from './App.jsx'




  const router = createBrowserRouter(
    [
      {
        path:'/',
        element: <App/>,
        children:[
          {
            path:'/',
            element:<Login/>
          },
          {
            path:'/home',
            element:<Home/>
          },
        ]
      }
    ]
  )

createRoot(document.getElementById('root')).render(
    
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
)
