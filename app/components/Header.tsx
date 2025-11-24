"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/app/providers";
import Image from "next/image";
import RAUSLogo from "../assets/raus-logo.png";

type NavigationPage = {
  id: string;
  name: string;
  slug: string;
  submenu?: string[];
  imageUrl?: string[];
  tagLine?: string;
};

interface HeaderProps {
  isEditing?: boolean;
  setIsEditing?: (editing: boolean) => void;
  isSaving?: boolean;
  handleSave?: (isDraft: boolean) => void;
  showVersionHistory?: boolean;
  setShowVersionHistory?: (show: boolean) => void;
  versions?: any[];
  handleRevert?: (versionId: string) => void;
  draftNotes?: string;
  setDraftNotes?: (notes: string) => void;
  isLoggedIn?: boolean;
}

const Header = ({
  isEditing = false,
  setIsEditing = () => {},
  isSaving = false,
  handleSave = () => {},
  showVersionHistory = false,
  setShowVersionHistory = () => {},
  versions = [],
  handleRevert = () => {},
  draftNotes = "",
  setDraftNotes = () => {},
  isLoggedIn = false,
}: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [pages, setPages] = useState<NavigationPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const isAdmin = Boolean(user?.isAdmin);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch("/api/navigation");
        if (!response.ok) {
          throw new Error("Failed to load navigation");
        }
        const data = await response.json();
        const normalized = Array.isArray(data)
          ? data
              .map((item: any) => ({
                id: item.id,
                name: item.name || "Untitled",
                slug: item.slug || "",
                submenu: item.submenu,
                imageUrl: item.imageUrl,
                tagLine: item.tagLine,
              }))
              .filter((item) => item.id && item.slug)
          : [];
        setPages(normalized);
      } catch (error) {
        console.error("Header navigation error:", error);
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        expandedMenu &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setExpandedMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedMenu]);

  useEffect(() => {
    const handleScroll = () => {
      if(!isEditing) {
        setIsHeaderVisible(true);
        return;
      }
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isEditing]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setExpandedMenu(null);
      setMobileOpen(false);
      router.push("/login");
    }
  };

  const toggleMenu = (pageId: string) => {
    setExpandedMenu((prev) => (prev === pageId ? null : pageId));
  };

  const hasSubmenu = (page: NavigationPage) => {
    return !!page.submenu?.length;
  };

  const hasActiveSubmenu = (page: NavigationPage) => {
    if (!page.submenu || !Array.isArray(page.submenu)) return false;
    return page.submenu.some((item: string) => {
      const slugified = item
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      return pathname.includes(slugified);
    });
  };

  const getSubmenuSlugs = () => {
    const slugs = new Set<string>();
    pages.forEach((page) => {
      if (page.submenu && Array.isArray(page.submenu)) {
        page.submenu.forEach((item: string) => {
          const slugified = item
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
          slugs.add(slugified);
        });
      }
    });
    return slugs;
  };

  const submenuSlugs = getSubmenuSlugs();

  const mainPages = pages.filter((page) => {
    return !submenuSlugs.has(page.slug);
  });

  const isAuthenticated = Boolean(user);

  if (loading) {
    return (
      <header className="bg-black text-white shadow-2xl border-b border-gray-800 sticky top-0 z-50">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-400">Loading navigation...</span>
          </div>
        </div>
      </header>
    );
  }

  const handleNavClick = (slug: string, closeMenu = false) => {
    setExpandedMenu(null);
    if (closeMenu) {
      setMobileOpen(false);
    }
    router.push(`/${slug}`);
  };

  const handleHomeClick = () => {
    router.push("/home");
  };

  return (
    <header
      className={`bg-black text-white shadow-2xl border-b border-gray-800 sticky top-0 z-50 transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        zoom: "0.9",
      }}
    >
      <div className="w-full px-4 lg:px-8">
        <div className="flex items-start justify-between py-3">
          <button
            onClick={handleHomeClick}
            className="text-xl font-bold hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <Image src={RAUSLogo} alt="RAUS Logo" className="h-10 w-auto" />
          </button>
          <div
            ref={navRef}
            style={{
              flexDirection: "column",
            }}
          >
            <nav className="lg:flex items-center gap-1 flex-1 justify-end relative">
              <div className="hidden lg:flex">
                {mainPages.map((page) => (
                  <div key={page.id} className="relative">
                    {hasSubmenu(page) ? (
                      <button
                        type="button"
                        onClick={() => toggleMenu(page.id)}
                        className={`flex items-center gap-1 px-4 py-2 hover:bg-gray-800/50 rounded-md transition-all duration-200 text-sm font-medium ${
                          hasActiveSubmenu(page)
                            ? "text-red-500"
                            : "text-gray-200 hover:text-white"
                        }`}
                      >
                        {page.name}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 text-red-500 ${
                            expandedMenu === page.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleNavClick(page.slug)}
                        className={`px-4 py-2 hover:bg-gray-800/50 rounded-md transition-all duration-200 text-sm font-medium block ${
                          pathname === `/${page.slug}`
                            ? "text-red-500 bg-gray-800/50"
                            : "text-gray-200 hover:text-white"
                        }`}
                      >
                        {page.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-3 ml-4">
                {isAuthenticated && (
                  <>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-md">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-300">
                        {user?.email}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="border border-gray-700 hover:bg-gray-800 text-sm h-8 gap-2 text-red-500 px-3 rounded-md flex items-center"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Logout
                    </button>
                  </>
                )}
              </div>

              <button
                type="button"
                className="lg:hidden hover:bg-gray-800 p-2 rounded-md"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </nav>

            {expandedMenu && (
              <div className="hidden lg:block bg-black/95 backdrop-blur-sm">
                {(() => {
                  const page = mainPages.find((p) => {
                    return p.id == expandedMenu;
                  });

                  let activeImageIndex = 0;
                  if (page?.submenu) {
                    for (let i = 0; i < page.submenu.length; i++) {
                      const slugified = page.submenu[i]
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, "")
                        .trim()
                        .replace(/\s+/g, "-");

                      if (pathname.includes(slugified)) {
                        activeImageIndex = i;
                        break;
                      }
                    }
                  }

                  return (
                    <div className="w-full py-6">
                      <div className="flex items-start gap-8">
                        <div className="flex-shrink-0">
                          <div className="flex flex-col gap-1 min-w-[280px]">
                            {page?.submenu?.map((submenuItem, index) => {
                              const slugified = submenuItem
                                .toLowerCase()
                                .replace(/[^a-z0-9\s-]/g, "")
                                .trim()
                                .replace(/\s+/g, "-");

                              const currentLocation =
                                pathname.includes(slugified);

                              return (
                                <button
                                  key={slugified}
                                  onClick={() => handleNavClick(slugified)}
                                  className={`px-4 py-3 rounded-md transition-all duration-200 group w-full text-left ${
                                    currentLocation
                                      ? "bg-gray-900/70 text-red-500"
                                      : "hover:bg-gray-900/50 text-gray-300"
                                  }`}
                                  style={{
                                    animationDelay: `${index * 50}ms`,
                                    animation: "slideIn 0.3s ease-out forwards",
                                    opacity: 0,
                                  }}
                                >
                                  <span
                                    className={`text-sm font-medium transition-colors ${
                                      currentLocation
                                        ? "text-red-500"
                                        : "text-gray-300 group-hover:text-white"
                                    }`}
                                  >
                                    {submenuItem}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {page?.imageUrl?.[activeImageIndex] && (
                          <div className="flex-shrink-0 w-100">
                            <div className="relative overflow-hidden rounded-lg shadow-2xl">
                              <img
                                src={page.imageUrl[activeImageIndex]}
                                alt={page.name || "Menu image"}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                            {page?.tagLine && (
                              <p className="mt-3 text-sm text-red-500 font-medium">
                                {page.tagLine}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
                <style>{`
                  @keyframes slideIn {
                    from {
                      opacity: 0;
                      transform: translateY(-10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-800 py-3 animate-in slide-in-from-top-2 duration-300 max-h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {mainPages.map((page) => (
              <div key={page.id} className="flex flex-col">
                {hasSubmenu(page) ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleMenu(page.id)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-all duration-200 text-sm font-medium ${
                        hasActiveSubmenu(page)
                          ? "text-red-500 bg-gray-800/50"
                          : "text-gray-200 hover:bg-gray-800/50 hover:text-white"
                      }`}
                    >
                      {page.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 text-red-500 ${
                          expandedMenu === page.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedMenu === page.id ? "max-h-[600px]" : "max-h-0"
                      }`}
                    >
                      <div className="pl-4 mt-1 space-y-1">
                        {page.submenu?.map((submenuItem, index) => {
                          const slugified = submenuItem
                            .toLowerCase()
                            .replace(/[^a-z0-9\s-]/g, "")
                            .trim()
                            .replace(/\s+/g, "-");

                          const currentLocation = pathname.includes(slugified);

                          const animationDelay = `${index * 50}ms`;

                          return (
                            <button
                              key={slugified}
                              onClick={() => handleNavClick(slugified, true)}
                              className={`flex-1 block px-4 py-2.5 hover:bg-gray-900/50 rounded-md transition-all duration-200 text-sm hover:text-white w-full text-left ${
                                currentLocation
                                  ? "text-red-500"
                                  : "text-gray-300"
                              } ${
                                expandedMenu === page.id
                                  ? `animate-in slide-in-from-top-2 duration-200 [animation-delay:${animationDelay}]`
                                  : ""
                              }`}
                            >
                              {submenuItem}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick(page.slug, true)}
                    className={`px-4 py-3 rounded-md transition-all duration-200 text-sm font-medium w-full text-left ${
                      pathname === `/${page.slug}`
                        ? "text-red-500 bg-gray-800/50"
                        : "text-gray-200 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    {page.name}
                  </button>
                )}
              </div>
            ))}

            {isAuthenticated && (
              <div className="pt-3 mt-3 border-t border-gray-800 space-y-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-md">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{user?.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full border border-gray-700 hover:bg-gray-800 text-sm h-9 gap-2 text-red-500 rounded-md flex items-center justify-center"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Admin Control Panel */}
      {isAdmin && (
        <div className="sticky top-[80px] z-40 bg-white border-b border-gray-200 shadow-lg">
          <div className="max-w-auto mx-auto px-4 py-3">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-5 py-2 rounded-lg font-semibold transition ${
                  isEditing
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isEditing ? "← Exit Edit Mode" : "✏️ Edit Page"}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowVersionHistory(!showVersionHistory)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg font-semibold transition-colors"
                  title="View version history"
                >
                  📜 Versions
                </button>

                {isEditing && (
                  <>
                    <button
                      onClick={() => handleSave(true)}
                      disabled={isSaving}
                      className="px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200 rounded-lg font-semibold disabled:opacity-50 transition-colors"
                    >
                      {isSaving ? "💾 Saving..." : "💾 Save Draft"}
                    </button>
                    <button
                      onClick={() => handleSave(false)}
                      disabled={isSaving}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold disabled:opacity-50 transition-colors"
                    >
                      {isSaving ? "🚀 Publishing..." : "🚀 Publish"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="mt-3 bg-white border border-gray-200 p-3 rounded-lg space-y-2">
                {!isLoggedIn && (
                  <div className="flex items-center gap-2 text-red-700 bg-red-50 p-2 rounded border border-red-200">
                    <span className="text-sm">
                      ⚠️ You are not logged in. Changes will not be saved.
                    </span>
                    <a
                      href="/login"
                      className="text-red-600 hover:underline text-sm ml-auto"
                    >
                      Login here
                    </a>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Optional: Add notes for this version..."
                  value={draftNotes}
                  onChange={(e: any) => setDraftNotes(e.target.value)}
                  maxLength={100}
                  className="w-full bg-white text-gray-900 px-3 py-2 rounded border border-gray-300 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            )}

            {showVersionHistory && (
              <div className="mt-3 bg-white border border-gray-200 p-4 rounded-lg max-h-80 overflow-y-auto shadow-lg">
                <h3 className="font-bold text-gray-900 mb-3">
                  📋 Version History
                </h3>
                <div className="space-y-2">
                  {versions.map((version) => (
                    <div
                      key={version.versionId}
                      className="bg-gray-50 border border-gray-200 p-3 rounded flex justify-between items-center hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="text-sm text-gray-800">
                          {version.isDraft ? "📝 Draft" : "✅ Published"} -{" "}
                          {new Date(version.createdAt).toLocaleString()} by{" "}
                          {version.createdBy}
                        </div>
                        {version.notes && (
                          <div className="text-xs text-gray-500 mt-1">
                            {version.notes}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRevert(version.versionId)}
                        className="ml-3 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
                      >
                        Revert
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
