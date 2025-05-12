import { useState, useEffect } from "react";
import { TaskList } from "@/components/TaskList";
import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { userService } from "@/services/userService";
import { Avatar } from "@/components/ui/avatar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await userService.getCurrentUser();
      setIsAuthenticated(!!currentUser);
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Get user info after login
    userService.getCurrentUser().then(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  };

  const handleLogout = async () => {
    await userService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && user ? (
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <Avatar 
              initials={`${user.firstName[0]}${user.lastName[0]}`}
              name={user.firstName}
            />
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
          <TaskList />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          {showRegister ? (
            <div className="flex flex-col items-center">
              <Register onRegister={handleLogin} />
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowRegister(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Already have an account? Login
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Login onLogin={handleLogin} />
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Don't have an account? Register
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

