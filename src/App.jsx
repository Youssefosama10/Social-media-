import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './components/Home'
import {HeroUIProvider} from "@heroui/react";
import Layout from './components/Layout'
import AuthContextProvider from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Profile from './components/profile'
import PostDetails from './components/PostDetails'

const router = createBrowserRouter([
  { path: 'register', element: <Register /> },
  { path: 'login', element: <Login /> },
  { path: '', element: <Layout /> , children : [  { path: '', element: <Register /> },
    { path: 'Home', element: <ProtectedRoute> <Home /> </ProtectedRoute> }, 
    { path: 'Profile', element: <ProtectedRoute> <Profile /> </ProtectedRoute> } ,
    { path: 'PostDetails/:id', element: <ProtectedRoute> <PostDetails /> </ProtectedRoute> } ,
  ] },
])

 const queryClientconfig = new QueryClient()

export default function App() {
  return (

    <QueryClientProvider  client = {queryClientconfig}>

    <AuthContextProvider>
    <HeroUIProvider>
      <RouterProvider router={router} />
      <ToastContainer />
   </HeroUIProvider>
    </AuthContextProvider>
      
    </QueryClientProvider>
  )
}

