import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App.tsx'
import HandleDesserts from './pages/HandleDesserts.tsx'
import RegisterUser from './pages/RegisterUser.tsx'
import LoginUser from './pages/loginUser.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { UserContext } from './context/UserContext';


const router = createBrowserRouter([
{
  path:'/',
  element: <LoginUser />
},

{
  path:'/handleDesserts',
  element: <HandleDesserts />
},

{
  path:'/registerUser',
  element: <RegisterUser />
},

{
  path:'/mainScreen',
  element: <App />
},

{
  path:'*',
  element: <LoginUser />
}

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <UserProvider>
        <RouterProvider router = {router} />
      </UserProvider>
  </StrictMode>,
)
