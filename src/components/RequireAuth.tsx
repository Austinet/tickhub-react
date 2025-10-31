import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const RequireAuth = () => {
    const { authenticatedUser} = useAuthContext();
    const location = useLocation()
    
  return (
    authenticatedUser ? <Outlet />
    : <Navigate to={'/login'} state ={{from: location}} replace/>
  )
}

export default RequireAuth