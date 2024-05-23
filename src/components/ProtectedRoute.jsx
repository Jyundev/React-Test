import { Navigate } from "react-router-dom";
import { auth } from "../filebase"
import PropTypes from 'prop-types'; 

function ProtectedRoute({children}) {
    const user = auth.currentUser;
    if (user === null) {
        return <Navigate to="/login" />
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute  