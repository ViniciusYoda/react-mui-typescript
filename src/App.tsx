import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts'
import { Login, MenuLateral } from './shared/components'
import { AppRoutes } from './routes';

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <CssBaseline />
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                  <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>

    </AuthProvider>
  );
}

export default App;
