import {
    // Box,
    Button,
} from '@mui/material';
import { axiosInstance } from 'src/axiosApi';
import { useHistory } from 'react-router-dom';

interface LogoutButtonProps  {
    children?: any;
    styling?: object;
}

export default function LogoutButton({ children, styling }: LogoutButtonProps, props) {

    let history = useHistory();

    function handleSubmit() {
        axiosInstance.post('/auth/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        })
        .then( (res: any) => {
            history['alert'] = {open: true, msg: 'Succesfully logged out'}
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            return res;
        })
        .then( (res: any) => {
            history.push('/')
        })
        .catch( (err: any) => {
            console.log(err);
        })
    }

    return (
        <Button
            {...props}
            sx={{
                ...styling
            }}
            onClick={ handleSubmit }
        >
            { children ? children : 'Logout'}
        </Button>
    );
}