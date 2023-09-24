import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, flag}) => {

    return flag ? (
        children
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute;
