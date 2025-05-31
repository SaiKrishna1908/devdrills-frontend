import { Navigate, Outlet } from 'react-router-dom'


export default function PrivateRoutes ()  {
  let token = localStorage.getItem("token");
  console.log("token is", token)
  console.log(token == null)
  return (
    token != null ? <Outlet/> : <Navigate to='/'/>
  )
}

