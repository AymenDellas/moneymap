import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Clipboard,
  HandCoins,
  ArrowLeftRight,
  LogOut,
  User,
  Menu,
  X,
  Home,
  CircleUserRound,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabase";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Clean up subscription on unmount
    return () => subscription?.unsubscribe();
  }, []);

  // Add effect to prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
      // Close mobile menu if open
      setIsMenuOpen(false);
      setUserMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const isPathActive = (path) => {
    return location.pathname.includes(path);
  };

  const navLinks = [
    {
      title: "Overview",
      path: "/dashboard/overview",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Transactions",
      path: "/dashboard/transactions",
      icon: <ArrowLeftRight size={20} />,
    },
    {
      title: "Saving Goals",
      path: "/dashboard/savings-goals",
      icon: <HandCoins size={20} />,
    },
    {
      title: "Reports",
      path: "/dashboard/reports",
      icon: <Clipboard size={20} />,
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
        {/* Desktop & Tablet Navbar */}
        <nav className="backdrop-blur-lg bg-secondary/80 text-light rounded-b-xl md:rounded-xl w-full md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto mt-0 md:mt-4 flex p-3 items-center justify-between shadow-md shadow-black/10">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 mr-6">
              <img
                src="/logo.png"
                alt="Logo"
                className="aspect-video w-32 md:w-40 h-8 object-cover"
              />
            </Link>

            {/* Desktop navigation links */}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isPathActive(link.path)
                      ? "bg-purple/20 text-purple font-medium shadow-sm"
                      : "text-light/80 hover:bg-light/10 hover:text-light"
                  }`}
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-light focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} />
          </button>

          {/* Desktop user menu */}
          <div className="hidden md:block relative">
            {user ? (
              <div className="flex items-center">
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 bg-light/10 hover:bg-light/20 text-light px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    <CircleUserRound size={20} />
                    <span className="hidden lg:inline-block">
                      {user.email?.split("@")[0]}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg border border-light/10 py-1 z-50">
                      <div className="px-4 py-2 border-b border-light/10">
                        <p className="text-sm text-light/80">Signed in as</p>
                        <p className="text-sm font-medium text-light truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-light/10 flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="bg-purple/80 hover:bg-purple text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-light/10 hover:bg-light/20 text-white border border-purple/50 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Mobile menu */}
      <div
        className={`flex flex-col h-full w-[80%] max-w-sm bg-secondary fixed top-0 right-0 z-50 rounded-l-xl shadow-xl transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-light/20 px-4 py-5">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img
              src="/logo.png"
              alt="Logo"
              className="aspect-video w-32 h-7 object-cover"
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-light hover:text-purple p-1 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {user && (
          <div className="px-4 py-4 border-b border-light/10 flex items-center">
            <div className="bg-purple/20 p-2 rounded-full mr-3">
              <User size={24} className="text-purple" />
            </div>
            <div>
              <div className="text-light font-medium">
                {user.email?.split("@")[0]}
              </div>
              <div className="text-light/60 text-xs">{user.email}</div>
            </div>
          </div>
        )}

        <nav className="px-2 py-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                    isPathActive(link.path)
                      ? "bg-purple/20 text-purple font-medium"
                      : "text-light/80 hover:bg-light/10 hover:text-light"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-6 border-t border-light/10 mt-auto">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-4 py-3 rounded-lg transition-all duration-200"
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </button>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full block text-center bg-purple/80 hover:bg-purple text-white px-4 py-3 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full block text-center bg-light/10 hover:bg-light/20 text-white border border-purple/50 px-4 py-3 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
