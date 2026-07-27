import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts'
import { Login, MenuLateral } from './shared/components'


function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>

              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>

    </AuthProvider>
  );
}

export default App;
