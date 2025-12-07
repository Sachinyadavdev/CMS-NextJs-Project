"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import AuthModal from "@/app/components/AuthModal";

interface AuthModalContextType {
  isOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  onLoginSuccess: (callback: (token: string, user: any) => void) => void;
  apiFetch: <T = any>(
    url: string,
    options?: RequestInit
  ) => Promise<T>;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export function AuthModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loginCallback, setLoginCallback] = useState<
    ((token: string, user: any) => void) | null
  >(null);

  const openAuthModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onLoginSuccess = useCallback(
    (callback: (token: string, user: any) => void) => {
      setLoginCallback(() => callback);
    },
    []
  );

  const handleLoginSuccess = useCallback(
    (token: string, user: any) => {
      closeAuthModal();
      if (loginCallback) {
        loginCallback(token, user);
        setLoginCallback(null);
      }
    },
    [closeAuthModal, loginCallback]
  );

  const apiFetch = useCallback(
    async <T = any,>(
      url: string,
      options?: RequestInit
    ): Promise<T> => {
      let retryCount = 0;
      const maxRetries = 1;

      const makeRequest = async (): Promise<T> => {
        const token = localStorage.getItem("token");
        const headers = {
          ...options?.headers,
          Authorization: token ? `Bearer ${token}` : "",
        };

        const response = await fetch(url, {
          ...options,
          headers,
        });


        if (response.status == 403) {
          if (retryCount < maxRetries) {
            retryCount++;

            return new Promise((resolve, reject) => {
              openAuthModal();
              onLoginSuccess((newToken: string, newUser: any) => {
                makeRequest()
                  .then(resolve)
                  .catch(reject);
              });
            });
          }
        }

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: `HTTP ${response.status}` }));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        return response.json();
      };

      return makeRequest();
    },
    [openAuthModal, onLoginSuccess]
  );

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        openAuthModal,
        closeAuthModal,
        onLoginSuccess,
        apiFetch,
      }}
    >
      <AuthModal
        isOpen={isOpen}
        onClose={closeAuthModal}
        onLoginSuccess={handleLoginSuccess}
      />
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
}
