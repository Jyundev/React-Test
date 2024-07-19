import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'; 

function ProtectedRoute({children}) {
    const user = sessionStorage.getItem('token');
    if (user === null) {
        return <Navigate to="/login" />
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute  