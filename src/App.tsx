

import { AppThemeProvider, AuthProvider } from './shared/contexts'

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>

      </AppThemeProvider>

    </AuthProvider>
  );
}

export default App;
