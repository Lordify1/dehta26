import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {advisorUrl} from '../../app'

export const Guard = ({children, requireAuth = false, guestOnly = false, redirectTo = `${advisorUrl}/login`}) => {
    const user = useAuth();

    return children;
}

export const InlineGuard = ({action,requireAuth = false, fallback}) => {
    const user = useAuth()
    const redirectTo = `${advisorUrl}/login`

    if(requireAuth && user == null){
        return fallback
    }else{
        return action
    }
    
    
}

export const navigateTo = (url) => {
    router.visit(url)
}