/**
 * Shared Feature - Layout Component
 * Main application layout with navigation header
 * Veterinaria Cuidado Animal
 */

import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, Stethoscope } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const startsWithPath = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Navigation Header */}
      <header className="bg-gradient-primary shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Cuidado Animal</h1>
            </Link>

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
                to="/clients"
                data-testid="nav-clients"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/clients') || startsWithPath('/pets/')
                    ? 'bg-white text-primary-900 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="hidden md:inline font-medium">Clientes</span>
              </Link>
              <Link
                to="/appointments"
                data-testid="nav-appointments"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/appointments')
                    ? 'bg-white text-primary-900 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden md:inline font-medium">Citas</span>
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
