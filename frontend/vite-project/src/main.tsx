import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App.tsx'
import HandleDesserts from './pages/HandleDesserts.tsx'
import DoceAI from './pages/DoceAI.tsx'

const router = createBrowserRouter([
{
  path:'/',
  element: <App />
},

{
  path:'/handleDesserts',
  element: <HandleDesserts />
},

{
  path:'/DoceAI',
  element: <DoceAI />
}

]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
