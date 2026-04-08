import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom'
import Login from './login/logIn'
import Home from './pages/Home'
import App from './App.jsx'
import HealthChecker from './pages/HealthChecker.jsx'
import LandingPage from './pages/LandingPage.jsx'
import AvatarPage from './pages/AvatarPage.jsx'
import DirectMessage from './pages/DirectMessage'
import UserContextProvider from './context/UserContextProvider'





  const router = createBrowserRouter(
    [
      {
        path:'/',
        element: <App/>,
        children:[
          {
            path:'/',
            element:<LandingPage/>
          },
          {
            path:'/home',
            element:<Home/>
          },
          {
            path:`/setAvatar/:username/:name`,
            element:<AvatarPage/>
          },
          {
            path:'/login',
            element:<Login/>
          },
           {
            path:'/dm',
            element:<DirectMessage/>
          },
          {
            path:'/healthChecker',
            element:<HealthChecker/>
          },
        ]
      }
    ]
  )

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </UserContextProvider>
)
