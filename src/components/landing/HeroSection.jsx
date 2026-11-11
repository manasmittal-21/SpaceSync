import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, Users, Volume2, Shield, Wifi, Zap, CheckCircle2, Compass } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';

const HeroSection = () => {
  const { isAuthenticated, loginAsDemo } = useAuth();
  const { setActiveModalRoom, rooms } = useBooking();
  const navigate = useNavigate();

  const handleExploreMap = () => {
    if (!isAuthenticated) {
      loginAsDemo();
    }
    navigate('/dashboard?tab=map');
  };

  const handleExploreSpaces = () => {
    const el = document.getElementById('featured-rooms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/dashboard?tab=explore');
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleHeroQuickReserve = () => {
    if (!isAuthenticated) {
      loginAsDemo();
    }
    setActiveModalRoom(rooms[0]);
    navigate('/dashboard');
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden mesh-grid">
      {/* Ambient Radial Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Live Pill */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-space-card/90 border border-space-border/90 shadow-sm backdrop-blur-md mb-6 hover:border-primary/50 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-space-text">
              TIET Patiala Campus Network Live (30.35447°N, 76.36621°E)
            </span>
            <span className="text-space-dim">•</span>
            <span className="text-xs text-secondary font-mono">eduroam Mesh</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl">
            Find your space.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-[#9C8EFF] to-secondary">
              Focus on what matters.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="mt-6 text-base sm:text-xl text-space-muted max-w-3xl leading-relaxed">
            The intelligent campus room discovery and booking platform engineered for <strong className="text-white">Thapar Institute of Engineering & Technology (TIET), Patiala</strong>. Real-time telemetry, OpenStreetMap GPS tracking, acoustic sensors, and zero ghost reservations across Nava Nalanda Library, TAN Lecture Halls, and COS Complex.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              onClick={handleExploreMap}
              leftIcon={Compass}
              rightIcon={ArrowRight}
              className="w-full sm:w-auto text-base px-7 py-3 shadow-glow-primary"
            >
              Explore TIET Campus Map
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleExploreSpaces}
              className="w-full sm:w-auto text-base px-6 py-3"
            >
              Browse Spaces
            </Button>

            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  loginAsDemo();
                  navigate('/dashboard');
                }}
                className="text-xs text-space-muted hover:text-white underline underline-offset-4 decoration-space-border hover:decoration-primary transition-all py-1"
              >
                Or launch student demo instantly →
              </button>
            )}
          </div>

          {/* Trust badges row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-space-dim">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>TIET Single Sign-On (SSO)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Campus Landmarks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>15m Anti-Ghost Auto-Release</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive UI Showcase / Product Preview */}
        <div className="mt-14 relative mx-auto max-w-5xl">
          <div className="rounded-2xl p-1 sm:p-2 bg-gradient-to-b from-space-border/80 via-space-border/30 to-transparent shadow-2xl">
            <div className="bg-[#121520] border border-space-border rounded-xl overflow-hidden shadow-2xl">
              {/* Fake Browser / App Chrome Bar */}
              <div className="px-4 py-3 bg-[#151824] border-b border-space-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-space-dim hidden sm:inline">
                    spacesync.thapar.edu/map?loc=nava-nalanda
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="available" dot pulse size="sm">
                    Patiala Gateway Online
                  </Badge>
                  <span className="text-xs font-mono text-space-dim hidden md:inline">
                    GPS: 30.35447, 76.36621
                  </span>
                </div>
              </div>

              {/* Showcase Content: Hero Room Card Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-7 items-center bg-[#10121A]/80">
                {/* Left: High-res Room Architecture Visual */}
                <div className="lg:col-span-7 relative rounded-xl overflow-hidden aspect-[16/10] border border-space-border shadow-lg group">
                  <img
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
                    alt="Nava Nalanda Central Library"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10121A] via-transparent to-black/20" />
                  
                  {/* Floating Live Telemetry Cards on Hero Photo */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-space-bg/85 backdrop-blur-md border border-white/10 text-xs font-mono text-secondary font-medium">
                      NNL-301
                    </span>
                    <Badge variant="available" dot pulse size="sm">
                      Available • Ready for Check-in
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 bg-space-bg/90 backdrop-blur-md border border-space-border/80 px-3 py-1.5 rounded-lg text-white">
                      <span className="flex items-center gap-1.5 text-secondary">
                        <Wifi className="w-3.5 h-3.5" /> TIET eduroam
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-primary-light">
                        <Volume2 className="w-3.5 h-3.5" /> &lt; 18 dB
                      </span>
                    </div>

                    <span className="bg-primary/90 text-white font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md">
                      Smart QR Pass Ready
                    </span>
                  </div>
                </div>

                {/* Right: Live Room Telemetry & 1-Click Action */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-primary font-medium uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Featured Research Pod</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Nava Nalanda Silent Focus Pod 3A
                    </h3>
                    <p className="text-xs text-space-muted flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                      Nava Nalanda Central Library • 3rd Floor Quiet Wing
                    </p>
                  </div>

                  {/* Room Highlights Matrix */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-space-sidebar border border-space-border">
                      <span className="text-space-dim block text-[11px]">Room Capacity</span>
                      <strong className="text-space-text font-semibold text-sm">2 Study Seats</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-space-sidebar border border-space-border">
                      <span className="text-space-dim block text-[11px]">Ambient Climate</span>
                      <strong className="text-emerald-400 font-semibold text-sm">20.5°C • Clean Air</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-space-sidebar border border-space-border">
                      <span className="text-space-dim block text-[11px]">Noise Telemetry</span>
                      <strong className="text-primary-light font-semibold text-sm">Silent (&lt; 18 dB)</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-space-sidebar border border-space-border">
                      <span className="text-space-dim block text-[11px]">Power Ports</span>
                      <strong className="text-secondary font-semibold text-sm">Dual USB-C 100W</strong>
                    </div>
                  </div>

                  {/* Immediate Action */}
                  <div className="pt-2 border-t border-space-border/60 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-space-dim">Allocation Cost</div>
                      <div className="text-sm font-bold text-space-text">
                        15 <span className="text-xs font-normal text-space-muted">pts/hr (Free Tier)</span>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      onClick={handleHeroQuickReserve}
                      rightIcon={ArrowRight}
                      className="px-5 py-2.5"
                    >
                      Instant Reserve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
