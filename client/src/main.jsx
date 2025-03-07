import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import Header from './components/header.jsx'
import Card from './components/card.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/Home.jsx'
import Courses from './components/Courses.jsx'
import AddCourse from './components/AddCourse.jsx'
import Layout from './components/layout.jsx'
import Store from './components/Store.jsx'
import Login from './components/Login.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App isAdmin={false} />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/admin",
        element: <App isAdmin={true} />,
      }
      ,
      {
        path: "/admin/create",
        element: <AddCourse />,
      }, {
        path: "/admin/courses/:id",
        element: <AddCourse />,
      }, {
        path: "/login",
        element: <Login isSignup={false}/>,
      }, {
        path: "/signup",
        element: <Login isSignup={true}/>,
      }
    ]
  }, 
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
