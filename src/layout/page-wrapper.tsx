import {
    Box,

    useMediaQuery,
    useTheme, Theme,
} from '@mui/material';
// import { indigo } from '@mui/material/colors';


interface WrapperProps {
    children?: any,
    styling?: object
}

/**
 * The Container element from material-ui with a className of 'page' (from index.css)
 * @param {object} styling An object containing styling for the Container element from material-ui
 */
export default function PageWrapper({ children, styling }: WrapperProps) {

    const theme: Theme = useTheme()

    const tablet = useMediaQuery('(min-width:900px)');

    return (
        <Box
            sx={{
                // backgroundColor: indigo[700],
                // backgroundColor: 'primary.light',
                bgcolor: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
                overflowY: 'auto',
                overflowX: 'hidden',
                color: 'text.primary',
                height: '100vh',
                minWidth: tablet ? 'calc(100vw - 10rem)' : '100vw',
                width: tablet ? 'calc(100vw - 10rem)' : '100vw',
                maxWidth: tablet ? 'calc(100vw - 10rem)' : '100vw',
                ...styling,
            }}
        >
            { children }
        </Box>
    );
}