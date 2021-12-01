import { Box } from '@mui/material';
import { Route } from "react-router-dom";
import { IsAuthenticated } from 'src/auth/is-authenticated';

/**
 * @param {string} err The error message to be shown when the user does not meet the criteria.
 * @param {boolean} invert If set to false (default) then the route will only be shown to authenticated users. When set to true, the route will only be shown to unauthenticated users.
 */
export default function ProtectedRoute({ err='Error: You should not be here', invert=false, ...props }) {

    function invertBoolean( auth: boolean ) {
        return invert ? !auth : auth
    }

    return (
        <>
        { invertBoolean(IsAuthenticated()) ?
            <Route {...props}/>
        :
            <Box>
                { err }
            </Box>
        }
        </>
    );
}