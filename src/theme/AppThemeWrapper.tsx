import App from 'src/App';
import { darkTheme, lightTheme } from 'src/theme/Theme'
import { ThemeProvider } from '@mui/material/styles';
import { useMemo, useState, createContext, } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppThemeWrapper({ hideLoader, showLoader }) {
  
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  
  const colorMode = useMemo( () => ({
      toggleColorMode: () => {
          setMode( prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }), [],
  );

  const theme = useMemo( () =>
    mode === 'dark' ? darkTheme : lightTheme,
    [mode],
  );
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App
          hideLoader={hideLoader}
          showLoader={showLoader}
        />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}