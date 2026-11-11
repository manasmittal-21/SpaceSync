import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, Sparkles, LogIn, ArrowRight, Menu, X, Shield, LayoutDashboard, MapPin } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDemoLogin = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  const handleGoToMap = () => {
    if (!isAuthenticated) {
      loginAsDemo();
    }
    navigate('/dashboard?tab=map');
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#10121A]/85 border-b border-space-border/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary p-[1px] shadow-glow-primary group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#10121A] rounded-[11px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">SpaceSync</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-secondary/15 text-secondary px-1.5 py-0.5 rounded border border-secondary/30">
                TIET PATIALA
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-space-muted">
          <button
            onClick={handleGoToMap}
            className="text-secondary hover:text-white flex items-center gap-1.5 transition-colors font-medium"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Campus Map</span>
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-white transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('featured-rooms')}
            className="hover:text-white transition-colors"
          >
            TIET Spaces
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="hover:text-white transition-colors"
          >
            Why SpaceSync
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button
                variant="primary"
                size="sm"
                leftIcon={LayoutDashboard}
                rightIcon={ArrowRight}
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              {/* Demo 1-Click Login Pill */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-xs text-secondary bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 active:scale-95"
                title="Instant access with preloaded student profile"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Student</span>
              </button>

              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>

              <Link to="/register">
                <Button variant="primary" size="sm" rightIcon={ArrowRight}>
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleGoToMap}
            className="text-xs text-secondary bg-secondary/10 border border-secondary/30 px-2.5 py-1 rounded-md font-medium flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" /> Map
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-space-muted hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-space-border bg-space-sidebar p-5 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-space-muted">
            <button
              onClick={handleGoToMap}
              className="text-left py-1 text-secondary font-medium flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" /> TIET Campus Map
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-1 hover:text-white"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('featured-rooms')}
              className="text-left py-1 hover:text-white"
            >
              TIET Spaces
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-left py-1 hover:text-white"
            >
              Why SpaceSync
            </button>
          </div>

          <div className="pt-4 border-t border-space-border flex flex-col gap-2.5">
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full" leftIcon={LayoutDashboard}>
                  Student Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="w-full text-xs"
                  onClick={handleDemoLogin}
                  leftIcon={Sparkles}
                >
                  Quick Demo Login
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
