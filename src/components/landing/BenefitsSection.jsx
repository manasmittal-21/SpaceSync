import React from 'react';
import { ShieldCheck, Volume2, CalendarSync, Cpu, Award, Users2, Sparkles, Clock, CheckCircle } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      title: 'Zero Ghost Bookings',
      description: 'Smart auto-release reclaims spaces if students fail to scan in within 15 minutes, boosting university seat utilization by 43%.',
      icon: Clock,
      stat: '43% Higher Availability',
      accent: 'border-emerald-500/30 text-emerald-400'
    },
    {
      title: 'Real-Time Acoustic Telemetry',
      description: 'Integrated IoT ambient microphones classify rooms from "Absolute Silence (<15dB)" to "Collaborative Sprint (45dB)", ensuring you always get the focus environment you need.',
      icon: Volume2,
      stat: 'Real-Time dB Sensors',
      accent: 'border-primary/30 text-primary-light'
    },
    {
      title: 'Unified Calendar Sync',
      description: 'Every reservation automatically generates an instant Google Calendar and Outlook link with room directions, Wi-Fi keys, and invitee access tokens.',
      icon: CalendarSync,
      stat: 'Instant 2-Way Sync',
      accent: 'border-secondary/30 text-secondary'
    },
    {
      title: 'Verified Hardware Specs',
      description: 'Know with 100% certainty that the room you reserved has RTX 4090 GPUs, 4K displays, Wacom tablets, or soldering stations before you walk over.',
      icon: Cpu,
      stat: '100% Verified Specs',
      accent: 'border-primary/30 text-primary-light'
    },
    {
      title: 'SpacePoints Karma System',
      description: 'Earn points and unlock priority booking windows during midterm and finals weeks by checking in punctually and vacating rooms in pristine condition.',
      icon: Award,
      stat: 'Priority Exam Access',
      accent: 'border-amber-500/30 text-amber-400'
    },
    {
      title: 'Study Circle Coordination',
      description: 'Group members receive instant push notifications to accept invites, view floor maps, and check who has arrived at the room.',
      icon: Users2,
      stat: 'Team Access Passes',
      accent: 'border-secondary/30 text-secondary'
    }
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 bg-[#10121A] border-t border-space-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built For Campus Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Universities & Students Choose SpaceSync
          </h2>
          <p className="mt-4 text-base text-space-muted leading-relaxed">
            Engineered with modern SaaS speed, granular hardware intelligence, and real-time smart campus sensors.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group p-6 sm:p-7 rounded-2xl bg-space-card border border-space-border hover:border-space-border-light transition-all duration-300 hover:shadow-card-elevated hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-space-sidebar border border-space-border flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className={`text-[11px] font-semibold font-mono px-2.5 py-1 rounded-full border bg-space-sidebar/80 ${b.accent}`}>
                      {b.stat}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {b.title}
                  </h3>

                  <p className="text-sm text-space-muted leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-space-border/40 flex items-center gap-2 text-xs text-space-dim">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span>Campus-wide standard protocol</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
