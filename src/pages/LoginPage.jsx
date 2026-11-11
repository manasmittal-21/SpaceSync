import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

const LoginPage = () => {
  const { login, loginAsDemo } = useAuth();
  const { showToast } = useBooking();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle standard login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Please enter your university student email.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please provide a valid email format (e.g., student@campus.edu).');
      return;
    }
    if (!password) {
      setError('Please enter your account password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      showToast('Welcome back! Signed in to SpaceSync.', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Login Functionality
  const handleDemoLogin = () => {
    loginAsDemo();
    showToast('Signed in as Demo Student (Alex Rivera)!', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#10121A] text-space-text flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mesh-grid">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary p-[1px] shadow-glow-primary group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#10121A] rounded-[11px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">SpaceSync</span>
          </Link>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sign in to your campus space
          </h2>
          <p className="mt-2 text-sm text-space-muted">
            Reserve collaborative labs, quiet study pods, and specialized university facilities.
          </p>
        </div>

        {/* Card Box */}
        <div className="mt-8 bg-space-card border border-space-border rounded-2xl p-6 sm:p-8 shadow-card-elevated">
          {/* Quick Demo Access Pill */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/15 border border-primary/30 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Instant Review Access</span>
            </div>
            <p className="text-xs text-space-muted mb-3">
              Skip typing and explore the full student discovery dashboard instantly.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs font-semibold"
              onClick={handleDemoLogin}
              leftIcon={Sparkles}
            >
              Sign In as Demo Student (Alex Rivera)
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-space-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-space-card px-2.5 text-space-dim font-medium">
                Or sign in with credentials
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="TIET Student Email"
              type="email"
              placeholder="alex.rivera@thapar.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={Mail}
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={Lock}
              rightIcon={showPassword ? EyeOff : Eye}
              onRightIconClick={() => setShowPassword(!showPassword)}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-space-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#141724] border-space-border text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span>Remember me on this device</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setEmail('alex.rivera@thapar.edu');
                  setPassword('thaparPass2026!');
                }}
                className="text-primary-light hover:underline font-medium"
              >
                Autofill sample
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              loading={loading}
              rightIcon={ArrowRight}
            >
              Sign In
            </Button>
          </form>

          {/* Campus SSO Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-lg bg-space-sidebar border border-space-border hover:border-space-border-light text-xs font-medium text-space-text flex items-center justify-center gap-2 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authenticate with Thapar University WebKiosk / SAML SSO</span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-6 text-center text-xs text-space-muted">
          New to SpaceSync?{' '}
          <Link to="/register" className="text-secondary font-medium hover:underline">
            Register your student badge →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
