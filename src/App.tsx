import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/auth-context";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
