"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AdminNavbar from "@/app/components/AdminNavbar";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (login/logout events)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <>
      {user?.isAdmin ? (
        <>
          <AdminNavbar user={user} />
          {children}
        </>
      ) : (
        <>
          <Header isLoggedIn={false} />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
