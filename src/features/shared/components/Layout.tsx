/**
 * Shared Feature - Layout Component
 * Main application layout with navigation header
 */

import { Link, useLocation } from 'react-router-dom';
import { Home, ChefHat, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-primary-100">
      {/* Navigation Header */}
      <header className="bg-gradient-primary shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Menu className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Recetas App</h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex gap-2" data-testid="main-nav">
              <Link
                to="/"
                data-testid="nav-home"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-white text-primary-900 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden md:inline font-medium">Inicio</span>
              </Link>
              <Link
                to="/recipes"
                data-testid="nav-recipes"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/recipes') || location.pathname.startsWith('/recipes/')
                    ? 'bg-white text-primary-900 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <ChefHat className="w-5 h-5" />
                <span className="hidden md:inline font-medium">Recetas</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
