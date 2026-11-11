import React from 'react';
import { Search, CalendarCheck, QrCode, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Card from '../common/Card';

const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Real-Time Space Discovery',
      description: 'Filter instantly by noise levels (silent to collaborative), group capacity, dual 4K monitors, whiteboards, or hardware maker equipment across all 6 faculties.',
      icon: Search,
      tag: 'Acoustic & Hardware Filters',
      color: 'from-primary/20 to-transparent'
    },
    {
      step: '02',
      title: 'One-Tap Campus Reservation',
      description: 'Lock in your study studio, quiet focus pod, or presentation amphitheater in seconds. Seamlessly invite group members and sync with Google or Outlook calendars.',
      icon: CalendarCheck,
      tag: 'Instant Calendar Hold',
      color: 'from-secondary/20 to-transparent'
    },
    {
      step: '03',
      title: 'Smart Contactless Check-In',
      description: 'Access the space using your digital student QR badge. If a reserved space is unoccupied for 15 minutes, SpaceSync automatically releases it back to fellow students.',
      icon: QrCode,
      tag: 'Zero Ghost Bookings',
      color: 'from-emerald-500/20 to-transparent'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#10121A] border-t border-space-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frictionless Campus Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How SpaceSync Works
          </h2>
          <p className="mt-4 text-base text-space-muted leading-relaxed">
            Eliminating 20-minute building walks and empty "booked" rooms with automated smart campus orchestration.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-space-card border border-space-border hover:border-space-border-light rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-card-elevated hover:-translate-y-1.5"
              >
                {/* Subtle top gradient accent */}
                <div className={`absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r ${item.color}`} />

                <div>
                  {/* Step number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-space-sidebar border border-space-border flex items-center justify-center text-primary-light group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-3xl font-extrabold text-space-border group-hover:text-primary/40 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">
                    {item.tag}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-space-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-space-border/40 flex items-center gap-2 text-xs text-space-dim group-hover:text-space-text transition-colors">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Enforced by campus IoT sensors</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
