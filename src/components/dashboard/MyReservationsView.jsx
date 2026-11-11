import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, CheckCircle2, History, QrCode } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import UpcomingReservations from './UpcomingReservations';
import { PAST_RESERVATIONS } from '../../data/mockData';

const MyReservationsView = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="space-y-6">
      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-space-border/60 pb-3">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'upcoming'
              ? 'bg-primary text-white shadow-glow-primary'
              : 'text-space-muted hover:text-white hover:bg-space-card'
          }`}
        >
          Active Reservations
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'past'
              ? 'bg-primary text-white shadow-glow-primary'
              : 'text-space-muted hover:text-white hover:bg-space-card'
          }`}
        >
          Past Booking History
        </button>
      </div>

      {activeTab === 'upcoming' ? (
        <UpcomingReservations />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-space-muted px-1">
            <span>Showing verified completed bookings from Fall 2026 semester</span>
          </div>

          <div className="space-y-3">
            {PAST_RESERVATIONS.map((res) => (
              <Card key={res.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-space-muted px-2 py-0.5 rounded bg-space-sidebar border border-space-border">
                      {res.roomCode}
                    </span>
                    <Badge variant="available" size="sm">
                      Completed & Verified
                    </Badge>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">{res.roomName}</h4>
                  <p className="text-xs text-space-dim flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-space-dim" />
                    <span>{res.building}</span>
                    <span>•</span>
                    <span>{res.date} ({res.timeSlot})</span>
                  </p>
                  <p className="text-xs text-space-muted italic mt-1">
                    "{res.purpose}"
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-space-border/50 text-xs">
                  <span className="text-emerald-400 font-mono font-semibold">
                    {res.pointsEarned} SpacePoints
                  </span>
                  <span className="text-space-dim text-[11px]">
                    On-time checkout recorded
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReservationsView;
