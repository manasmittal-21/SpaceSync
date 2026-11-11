import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, User, Mail, Lock, Eye, EyeOff, Hash, GraduationCap, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

const RegisterPage = () => {
  const { register, loginAsDemo } = useAuth();
  const { showToast } = useBooking();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [faculty, setFaculty] = useState('Computer Science & AI');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const faculties = [
    'Computer Science & Engineering (CSED)',
    'Electronics & Communication (ECED)',
    'Electrical & Instrumentation (EIED)',
    'Mechanical Engineering (MED)',
    'Civil Engineering (CED)',
    'Biotechnology (BTD)',
    'Mathematics & Data Science'
  ];

  // Auto-fill student data helper
  const handleAutofill = () => {
    setFullName('Elena Sharma');
    setEmail('elena.sharma@thapar.edu');
    setStudentId('102303491');
    setFaculty('Computer Science & Engineering (CSED)');
    setPassword('ThaparPass2026!');
    setConfirmPassword('ThaparPass2026!');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!fullName.trim()) {
      setError('Please provide your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid university email address.');
      return;
    }
    if (!studentId.trim()) {
      setError('Please provide your university student identification number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setError('You must accept the campus room reservation terms and anti-ghost-booking policy.');
      return;
    }

    try {
      setLoading(true);
      await register({
        fullName,
        email,
        studentId,
        faculty
      });
      showToast('Student account created successfully! Welcome to SpaceSync.', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during student registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    showToast('Signed in as Demo Student!', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#10121A] text-space-text flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden mesh-grid">
      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary p-[1px] shadow-glow-primary group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#10121A] rounded-[11px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">SpaceSync</span>
          </Link>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create your student account
          </h2>
          <p className="mt-2 text-sm text-space-muted">
            Unlock real-time room discovery, group workspaces, and instant digital badge passes.
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-space-card border border-space-border rounded-2xl p-6 sm:p-8 shadow-card-elevated">
          {/* Quick Demo Option Header */}
          <div className="mb-6 flex items-center justify-between p-3 rounded-xl bg-space-sidebar border border-space-border/80">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-space-text">Need immediate evaluation?</span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-xs text-secondary hover:underline font-medium"
            >
              Skip to Demo →
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Student Name"
              placeholder="Elena Rostova"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={User}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="University Email"
                type="email"
                placeholder="elena@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={Mail}
                required
              />

              <Input
                label="Student ID Number"
                placeholder="STU-2026-9041"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                leftIcon={Hash}
                required
              />
            </div>

            {/* Faculty Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-space-text">
                Enrolled Faculty / Department <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full bg-[#141724] border border-space-border text-sm text-space-text rounded-lg py-2.5 px-3 focus:outline-none focus:border-primary"
                >
                  {faculties.map((f, idx) => (
                    <option key={idx} value={f} className="bg-space-card">
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={Lock}
                required
              />

              <Input
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={Lock}
                rightIcon={showPassword ? EyeOff : Eye}
                onRightIconClick={() => setShowPassword(!showPassword)}
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-space-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded bg-[#141724] border-space-border text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="leading-relaxed">
                  I agree to the <span className="text-space-text underline">Campus Room Fair Use Policy</span> and understand that un-scanned reservations are released after 15 minutes.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loading}
                rightIcon={ArrowRight}
              >
                Register & Enter SpaceSync
              </Button>

              <button
                type="button"
                onClick={handleAutofill}
                className="w-full py-2 text-xs text-space-dim hover:text-primary-light transition-colors"
              >
                Autofill sample student data
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <p className="mt-6 text-center text-xs text-space-muted">
          Already registered?{' '}
          <Link to="/login" className="text-secondary font-medium hover:underline">
            Sign in to existing account →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
