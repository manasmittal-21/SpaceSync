import React from 'react';
import { User, ShieldCheck, Award, GraduationCap, Calendar, Clock, Barcode, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';

const ProfileView = () => {
  const { user } = useAuth();
  const { stats } = useBooking();

  return (
    <div className="space-y-6">
      {/* Top Banner & Student Badge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Digital Student ID Badge Card */}
        <Card className="p-6 relative overflow-hidden bg-gradient-to-b from-[#181C2B] to-[#12141F] border-primary/30 shadow-card-elevated">
          {/* Subtle watermarked logo / mesh */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between pb-4 border-b border-space-border/60">
            <span className="text-[11px] font-mono uppercase text-space-muted tracking-wider">
              Campus Digital Pass
            </span>
            <Badge variant="available" dot size="sm">
              Active Student
            </Badge>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Student'}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/50 shadow-glow-primary"
            />
            <div className="min-w-0">
              <h3 className="font-bold text-lg text-white truncate flex items-center gap-1.5">
                <span>{user?.name || 'Alex Rivera'}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              </h3>
              <p className="text-xs text-secondary font-mono">
                {user?.studentId || 'STU-2024-8842'}
              </p>
              <p className="text-xs text-space-muted truncate mt-0.5">
                {user?.faculty || 'Computer Science & AI'}
              </p>
            </div>
          </div>

          {/* Barcode representation */}
          <div className="mt-6 pt-4 border-t border-space-border/60">
            <div className="h-10 bg-white/90 rounded p-1 flex items-center justify-between px-3">
              {Array.from({ length: 42 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-full ${
                    idx % 3 === 0 ? 'w-1 bg-black' : idx % 5 === 0 ? 'w-1.5 bg-black' : 'w-0.5 bg-black'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-space-dim mt-1">
              <span>NFC / RFID LINKED</span>
              <span>EXPIRES: DEC 2026</span>
            </div>
          </div>
        </Card>

        {/* Academic Profile & Karma Points */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-bold text-white mb-4">
              Academic Space Allocation & Status
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-space-sidebar border border-space-border">
                <span className="text-[11px] text-space-dim block">Karma Points</span>
                <div className="text-xl font-bold text-primary-light mt-0.5">
                  {stats.spacePoints} pts
                </div>
                <span className="text-[10px] text-emerald-400">Tier 2 Priority Hold</span>
              </div>

              <div className="p-3.5 rounded-xl bg-space-sidebar border border-space-border">
                <span className="text-[11px] text-space-dim block">Study Hours</span>
                <div className="text-xl font-bold text-secondary mt-0.5">
                  {stats.totalHoursStudied} hrs
                </div>
                <span className="text-[10px] text-space-muted">This semester</span>
              </div>

              <div className="p-3.5 rounded-xl bg-space-sidebar border border-space-border">
                <span className="text-[11px] text-space-dim block">Punctuality Score</span>
                <div className="text-xl font-bold text-emerald-400 mt-0.5">
                  {stats.punctualityRate || '98.5%'}
                </div>
                <span className="text-[10px] text-emerald-400">Zero ghost releases</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-space-border/50 text-xs text-space-muted space-y-2">
              <div className="flex items-center justify-between">
                <span>Enrolled Faculty:</span>
                <span className="text-white font-medium">{user?.faculty || 'Computer Science & AI'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Academic Standing:</span>
                <span className="text-white font-medium">{user?.semester || 'Year 3 • Fall 2026'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Primary Campus:</span>
                <span className="text-white font-medium">TIET Main Campus, Bhadson Road, Patiala</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
