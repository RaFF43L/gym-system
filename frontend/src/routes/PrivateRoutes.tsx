
import {
    Navigate,
    Outlet,
  } from 'react-router-dom';

interface TypePrivateRoutes {
    user: any,
    redirectPath: any
    children: any
}
export default function PrivateRoutes ({user, redirectPath, children}: TypePrivateRoutes) {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;

}
