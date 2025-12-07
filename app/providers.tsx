"use client";

import React, {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Provider as ReduxProvider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import {
  store,
  setCredentials,
  clearCredentials,
  type RootState,
  type AppDispatch,
  type User,
} from "@/lib/store";
import NavigationLoader from "./components/NavigationLoader";
import BackToTop from "./components/Features/BackToTop";
import {
  LoadingProvider,
  useComponentLoading,
} from "./contexts/LoadingContext";
import { AuthModalProvider } from "./contexts/AuthModalContext";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const { startLoading: startAuthLoading, stopLoading: stopAuthLoading } =
    useComponentLoading("auth");

  useEffect(() => {
    const checkAuth = async () => {
      startAuthLoading();
      try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
          dispatch(
            setCredentials({ token: savedToken, user: JSON.parse(savedUser) })
          );
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
        stopAuthLoading();
      }
    };

    checkAuth();
  }, [dispatch, startAuthLoading, stopAuthLoading]);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    dispatch(setCredentials({ token: data.token, user: data.user }));
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, register: true }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    const data = await response.json();
    dispatch(setCredentials({ token: data.token, user: data.user }));
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(clearCredentials());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ReduxProvider store={store}>
        <LoadingProvider>
          <AuthProviderInner>
            <AuthModalProvider>
              <NavigationLoader />
              <BackToTop />
              {children}
            </AuthModalProvider>
          </AuthProviderInner>
        </LoadingProvider>
      </ReduxProvider>
    </Suspense>
  );
}

// Error boundary for Redux-related errors
export class ReduxErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Redux Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within Providers");
  }
  return context;
}
