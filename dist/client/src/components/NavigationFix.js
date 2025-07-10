import { jsx as _jsx } from "react/jsx-runtime";
import { useLocation } from "wouter";
// Global navigation utility for consistent routing throughout the app
export const useNavigate = () => {
    const [location, setLocation] = useLocation();
    const navigate = (path) => {
        setLocation(path);
    };
    return { navigate, location };
};
// Fix for buttons that need navigation
export const NavigationButton = ({ href, onClick, children, className, ...props }) => {
    const { navigate } = useNavigate();
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        else if (href) {
            navigate(href);
        }
    };
    return (_jsx("button", { onClick: handleClick, className: className, ...props, children: children }));
};
