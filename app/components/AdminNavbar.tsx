"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RAUSLogo from "../assets/raus-logo.png";

interface AdminNavbarProps {
    user?: {
        email: string;
        isAdmin: boolean;
    } | null;
}

export default function AdminNavbar({ user }: AdminNavbarProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const navigateToLogout = () => {
        router.push("/logout");
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <div className="flex-shrink-0 p-2 rounded-xl backdrop-blur-sm">
                            <Image src={RAUSLogo} alt="RAUS Logo" className="h-8 w-auto" />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user && (
                            <>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <span className="text-sm text-gray-200 font-medium">
                                        {user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={navigateToLogout}
                                    className="text-gray-300 hover:text-white transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/5 flex items-center space-x-2"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none transition-all duration-200 bg-white/10 p-2 rounded-lg"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && user && (
                <div className="md:hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 pt-3 pb-4 space-y-3">
                        <div className="px-3 py-2 text-sm text-gray-300 bg-white/5 rounded-lg">
                            {user.email}
                        </div>
                        <button
                            onClick={() => {
                                navigateToLogout();
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
