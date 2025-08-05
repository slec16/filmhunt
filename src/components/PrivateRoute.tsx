// import { Route, Navigate } from 'react-router';
// import { useAuth } from '../contexts/auth-context';

// export default function PrivateRoute({ children, ...rest }: {children: React.ReactNode}) {
//   const { token } = useAuth();
//   const render = token ? children : <Navigate to="/login" />;
//   return <Route {...rest} render={() => render} />;
// }

import { Navigate } from 'react-router';
import { useAuth } from '../contexts/auth-context';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthorized } = useAuth();
    return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute