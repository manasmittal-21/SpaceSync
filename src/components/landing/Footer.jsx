import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Heart, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-space-sidebar border-t border-space-border/80 text-space-muted text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary p-[1px]">
                <div className="w-full h-full bg-[#10121A] rounded-[7px] flex items-center justify-center">
                  <Layers className="w-4 h-4 text-secondary" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">SpaceSync</span>
                <span className="text-[10px] uppercase font-bold text-secondary bg-secondary/10 px-1 py-0.2 rounded border border-secondary/25">
                  TIET PATIALA
                </span>
              </div>
            </Link>
            <p className="text-space-dim text-xs leading-relaxed max-w-sm">
              Dedicated smart campus room discovery, OpenStreetMap spatial telemetry, and frictionless reservation infrastructure for Thapar Institute of Engineering and Technology (TIET), Patiala.
            </p>

            {/* Live Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-card border border-space-border text-[11px] text-space-text font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>TIET Campus GPS: 30.35447°N, 76.36621°E • Online</span>
            </div>
          </div>

          {/* Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">TIET Landmarks</h4>
            <ul className="space-y-2 text-space-dim">
              <li><Link to="/dashboard?tab=map" className="hover:text-white transition-colors">Nava Nalanda Central Library</Link></li>
              <li><Link to="/dashboard?tab=map" className="hover:text-white transition-colors">Lecture Hall Complex (LHC / TAN)</Link></li>
              <li><Link to="/dashboard?tab=map" className="hover:text-white transition-colors">COS Complex (Student Activities)</Link></li>
              <li><Link to="/dashboard?tab=map" className="hover:text-white transition-colors">STEP / Venture Lab Incubator</Link></li>
              <li><Link to="/dashboard?tab=map" className="hover:text-white transition-colors">Kravings Food Court & Student Center</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-space-dim">
              <li><Link to="/dashboard?tab=map" className="hover:text-white transition-colors">Campus Interactive Map</Link></li>
              <li><Link to="/dashboard?tab=explore" className="hover:text-white transition-colors">Room Directory</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">TIET Student Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register Student Badge</Link></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Compliance</h4>
            <ul className="space-y-2 text-space-dim">
              <li><span className="hover:text-white transition-colors cursor-pointer">TIET Space Allocation Rules</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">15-Min Auto-Release Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Acoustic Quiet Hours Charter</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Disability Access (WCAG 2.1)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Campus IoT Sensor Audits</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-space-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-space-dim">
          <p>© 2026 SpaceSync Technologies • Thapar Institute of Engineering & Technology, Patiala.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for TIET Thaparians
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
